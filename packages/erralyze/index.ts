/**
 * Browser Error Stack Formats
 *
 * | Browser          | Format                                    | Example                             | Description                                                                 |
 * |-------------------|------------------------------------------|-------------------------------------|-----------------------------------------------------------------------------|
 * | Chrome and IE     | at functionName (fileName:line:column)   | at myFunction (example.js:10:5)     | The error stack starts with "at", followed by the function name, file name, line number, and column information. |
 * | Firefox and Safari| functionName@fileName:line:column        | myFunction@example.js:10:5          | The error stack does not contain "at", but directly includes the function name, file name, line, and column information. |
 * | Opera 9           | Line lineNum.*script fileName            | Line 10.*script example.js          | Opera 9's error stack has a specific format, including the line number and file name.                            |
 * | Opera 10          | Line lineNum.*script fileName<br>In function functionName | Line 10.*script example.js<br>In function myFunction | Opera 10's error stack format is based on Opera 9 but adds function names.                                       |
 * | Opera 11          | Similar to Firefox and Safari            | -                                   | Opera 11's error stack format is similar to Firefox and Safari but may include special cases, such as anonymous function names. |
 */


export type StackEvent = ErrorEvent | PromiseRejectionEvent | Error | string;

export type Range = number | [number, number];

/**
 * Configuration options for parsing a stack trace.
 */
export interface StackTraceParseOptions {
    /**
     * Specifies the range of stack frames to include in the parsed result.
     * Can be a single number (starting index) or a tuple `[start, end]` (inclusive range).
     * Helps optimize performance by limiting the stack frames to process.
     *
     * @example
     * slice: 2 // Start from the 2nd frame to the end
     * slice: [1, 4] // Include frames from index 1 to index 4
     */
    frameRange?: Range

    /**
     * Determines behavior when the stack trace is not found.
     * - If `true`, returns an empty result instead of throwing an error.
     * - If `false` (default), throws an error when the stack is not available.
     *
     * @default false
     */
    allowMissing?: boolean;
}

/**
 * Represents a single frame in a stack trace.
 */
export interface StackFrame {
    /**
     * The file or script where the error occurred.
     * Can be a URL, a local file path, or `undefined` if not available.
     * 
     * @example "http://example.com/script.js"
     * @example "C:/path/to/file.js"
     */
    filename?: string;

    /**
     * The column number in the file where the error occurred.
     * This is often provided by modern JavaScript engines.
     * 
     * @example 15
     */
    colno?: number;

    /**
     * The line number in the file where the error occurred.
     * Indicates the approximate location of the error in the source file.
     * 
     * @example 42
     */
    lineno?: number;

    /**
        * The raw stack trace string generated by the JavaScript engine.
        * Contains detailed information about the call stack at the time of the error.
        * 
        * @example
        * "Error: Something went wrong\n    at foo (http://example.com/script.js:10:15)\n    at bar (native)"
        */
    stack?: string;

    /**
     * The HTML element associated with the error (if applicable).
     * This is the tag name of the element where the error occurred or was triggered.
     * 
     * @example "img"
     * @example "script"
     */
    element?: keyof HTMLElementTagNameMap;

    /**
    * A hyperlink reference related to the error.
    * Can be a source URL or a path indicating the origin of the problem, such as a failed resource.
    * 
    * @example "http://example.com/resource.js"
    * @example "/assets/missing-image.png"
    */
    link?: string;

    /**
     * The name of the function that caused the error.
     */
    function?: string;

    args?: string[];
}

export interface StackTrace extends StackFrame {
    /**
       * The error message associated with the frame.
       * Describes the nature of the error, such as a reference or type error.
       * 
       * @example "ReferenceError: foo is not defined"
       */
    message: string;

    /**
     * The type of error represented by this stack frame.
     * Typically corresponds to the error name, such as `TypeError` or `ReferenceError`.
     * 
     * @example "ReferenceError"
     * @example "TypeError"
     */
    type: string;

    frames?: StackFrame[]
}

/**
 * Regular expression to match stack trace lines from Chrome and IE.
 * 
 * ```ts
 * Error: Example error
 *  at foo (http://example.com/script.js:10:15)
 *  at bar (native)
 *  at Function.prototype.call (C:/path/to/file.js:20:5)
 *  at eval (eval at <anonymous> (http://example.com/script.js:30:10), <anonymous>:1:1)
 * ```
 */
const CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;


/**
 * Regular expression to match stack trace lines from Opera 9.
 * 
 * Opera 9's error stack traces have the following format:
 * 
 * ```ts
 * Error: Something went wrong
 * Line 42 of script in http://example.com/script.js
 * Line 100 of script in http://example.com/another.js
 * ```
 * 
 * This regular expression extracts the line number and the script file (or URL)
 * from error messages in Opera 9, which follow the pattern:
 * "Line <line_number> of script (in) <script_file_or_url>".
 * 
 * Example usage:
 * ```ts
 * const errorMessage = "Line 42 of script in http://example.com/script.js";
 * const match = OPERA_9_STACK_REGEXP.exec(errorMessage);
 * if (match) {
 *   const lineNumber = match[1]; // 42
 *   const scriptFile = match[2]; // http://example.com/script.js
 * }
 * ```
 */
const OPERA_9_STACK_REGEXP = /Line (\d+).*script (?:in )?(\S+)/i;

/**
 * Regular expression to match stack trace lines from Opera 9, with optional function name extraction.
 * 
 * Opera 9's error stack traces have the following format:
 * 
 * ```ts
 * Error: Something went wrong
 * Line 42 of script in http://example.com/script.js
 * Line 100 of script in http://example.com/another.js: In function someFunction
 * ```
 * 
 * This regular expression extracts:
 * - The **line number** where the error occurred.
 * - The **script file (or URL)** involved in the error.
 * - Optionally, the **function name** where the error occurred (if provided in the stack trace).
 * 
 * Example usage:
 * ```ts
 * const errorMessage = "Line 42 of script in http://example.com/script.js: In function someFunction";
 * const match = OPERA_10_STACK_REGEXP.exec(errorMessage);
 * if (match) {
 *   const lineNumber = match[1]; // 42
 *   const scriptFile = match[2]; // http://example.com/script.js
 *   const functionName = match[3]; // someFunction (if available)
 * }
 * ```
 */
const OPERA_10_STACK_REGEXP = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;


/**
 * Regular expression to match stack trace lines from Firefox and Safari.
 * 
 * This regular expression is designed to match stack trace entries that follow the 
 * typical format seen in Firefox and Safari, which usually contain the function name 
 * or script path followed by the line number.
 * 
 * Common stack trace formats for Firefox and Safari:
 * 
 * ```ts
 * at foo (http://example.com/script.js:10:15)
 * at bar (native)
 * at myFunction (C:/path/to/file.js:20:5)
 * ```
 * 
 * The regular expression matches:
 * - A function name or script URL, followed by a colon (`:`) and the line number.
 * - It optionally matches an `@` symbol at the beginning of the line, which is commonly used in stack traces.
 * 
 * Explanation:
 * - `(^|@)`: Matches the start of the line (`^`) or an `@` symbol (if present).
 * - `\S+`: Matches one or more non-whitespace characters (the function name or script URL).
 * - `:\d+`: Matches a colon followed by one or more digits (the line number).
 * 
 * Example matches:
 * - `"at foo (http://example.com/script.js:10:15)"` → matches `http://example.com/script.js:10`
 * - `"at bar (native)"` → matches `native`
 * - `"at myFunction (C:/path/to/file.js:20:5)"` → matches `C:/path/to/file.js:20`
 * 
 * This regular expression is case-insensitive and captures the script location and line number.
 */
const FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;

const SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;

/**
 * Type guard to determine if the provided event is a PromiseRejectedResult.
 * Differentiates between ErrorEvent and PromiseRejectedResult by checking
 * for the presence of the `reason` property.
 *
 * @param event - The event to check, which can be an ErrorEvent or a PromiseRejectedResult.
 * @returns True if the event is a PromiseRejectedResult, otherwise false.
 */
function isPromiseRejectionEvent<T extends PromiseRejectionEvent = PromiseRejectionEvent>(
    event: PromiseRejectionEvent | ErrorEvent | Error
): event is T {
    return 'reason' in event;
}

function safeParseInt(input: unknown) {
    if (typeof input === "string" || typeof input === "number") {
        return parseInt(input.toString(), 10);
    }
}

function safeSerialize<T extends StackEvent>(event: T): string {
    return typeof event === "object" && event !== null
        ? JSON.stringify(event)
        : String(event);
}

function applySlice<T>(lines: T[], options?: StackTraceParseOptions): T[] {
    if (options && options.frameRange != null) {
        if (Array.isArray(options.frameRange))
            return lines.slice(options.frameRange[0], options.frameRange[1])
        return lines.slice(0, options.frameRange)
    }
    return lines
}

/**
 * Creates an object with only defined (non-undefined) properties from the input data.
 * 
 * @param data The input object containing potential properties.
 * @returns A new object with only defined properties.
 */
function createStackFrame<T extends StackFrame = StackFrame>(input: { [K in keyof T]: T[K] | undefined }): T {
    const result: Partial<T> = {};
    (Object.keys(input) as (keyof T)[]).forEach((key) => {
        if (input[key] !== undefined) {
            result[key] = input[key];
        }
    });

    return result as T;
}

function omitUndefined<T extends Record<string, any>>(obj: { [K in keyof T]: T[K] | undefined }): T {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    ) as T;
}

function formattedStack<T extends StackFrame = StackFrame, D extends StackTrace = StackTrace>(frames: T[], stacktrace: D): D {
    if (frames.length > 0) {
        return {
            ...frames[0],
            ...omitUndefined<D>(stacktrace),
            frames
        }
    }

    return {
        ...stacktrace,
        frames
    }
}

/**
 * Extracts the file path, line number, and column number from a URL-like string.
 *
 * @param urlLike - The URL-like string to parse. Typically represents a stack frame location,
 * such as a script file with optional line and column information.
 * 
 * @returns A tuple containing:
 * - The file path or script name (e.g., "http://example.com/script.js" or "(native)").
 * - The line number (if present), or `undefined`.
 * - The column number (if present), or `undefined`.
 *
 * @example
 * extractLocation("http://example.com/script.js:10:15");
 * // Returns: ["http://example.com/script.js", "10", "15"]
 *
 * @example
 * extractLocation("http://example.com/script.js:10");
 * // Returns: ["http://example.com/script.js", "10", undefined]
 *
 * @example
 * extractLocation("(native)");
 * // Returns: ["native", undefined, undefined]
 */
export function parseLocation(urlLike: string): [string, string | undefined, string | undefined] {
    // Fast path: If the string does not contain a colon, treat it as a single location.
    if (!urlLike.includes(':')) {
        return [urlLike, undefined, undefined];
    }

    // Regular expression to capture the file path, line number, and column number.
    const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;

    // Remove parentheses and match the string against the regular expression.
    const parts = regExp.exec(urlLike.replace(/[()]/g, ''))!;

    // Return the matched groups, ensuring undefined for missing line or column numbers.
    return [parts[1], parts[2] || undefined, parts[3] || undefined] as const;
}

export function parseStack(error: Error, options?: StackTraceParseOptions): StackFrame[] {
    // @ts-expect-error missing stacktrace property
    if (typeof (error).stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
        return parseOpera(error, options)
    } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
        return parseV8OrIE(error, options);
    } else if (error.stack) {
        return parseFFOrSafari(error);
    } else if (options?.allowMissing) {
        return [];
    } else {
        return [createStackFrame({ stack: safeSerialize(error) })]
    }
}

export function parseOpera(error: Error, options?: StackTraceParseOptions): StackFrame[] {
    // @ts-expect-error missing stacktrace property
    if (!error.stacktrace || (error.message.includes('\n') && error.message.split('\n').length > error.stacktrace.split('\n').length))
        return parseOpera9(error)

    else if (!error.stack)
        return parseOpera10(error)

    else
        return parseOpera11(error, options)
}

export function parseOpera9(error: Error, options?: StackTraceParseOptions): StackFrame[] {
    const lines = error.message?.split('\n') || [];

    const result: StackFrame[] = [];

    for (let i = 2; i < lines.length; i += 2) {
        const match = OPERA_9_STACK_REGEXP.exec(lines[i]);
        if (match) {
            const [, lineno, filename] = match;
            result.push(createStackFrame({
                filename,
                lineno: safeParseInt(lineno),
                stack: lines[i]
            }));
        }
    }

    return applySlice(result, options);
}

export function parseOpera10(error: Error, options?: StackTraceParseOptions): StackFrame[] {
    // Ensure `stacktrace` property exists, or fallback if needed
    // @ts-expect-error missing stack property
    const stacktrace = error.stacktrace || error.stack;  // fallback to `stack` if `stacktrace` is undefined
    if (!stacktrace) {
        return [];
    }

    // Split the stack trace by line breaks
    const lines = stacktrace?.split('\n') || [];
    const result: StackFrame[] = [];

    for (let i = 2; i < lines.length; i += 2) {
        const match = OPERA_10_STACK_REGEXP.exec(lines[i]);
        if (match) {
            result.push(createStackFrame({
                filename: match[2],
                function: match[3],
                lineno: safeParseInt(match[1]),
                stack: lines[i]
            }));
        }
    }

    return applySlice(result, options);
}

export function parseOpera11(error: Error, options?: StackTraceParseOptions): StackFrame[] {
    const stack = error.stack || '';

    const lines = applySlice(
        stack.split('\n')
            .filter(line =>
                FIREFOX_SAFARI_STACK_REGEXP.test(line)
                && !line.startsWith('Error created at')),
        options
    );

    return lines.map<StackFrame>((line) => {
        const tokens = line.split('@');
        const location = parseLocation(tokens.pop()!);

        const functionCall = tokens.shift() || '';
        const functionName = functionCall
            .replace(/<anonymous function(: (\w+))?>/, '$2')
            .replace(/\([^)]*\)/g, '')
            || undefined;


        const argsRaw = functionCall.match(/\(([^)]*)\)/)?.[1];
        const args = argsRaw && argsRaw !== '[arguments not available]'
            ? argsRaw.split(',').map(arg => arg.trim())
            : undefined;

        return createStackFrame({
            function: functionName,
            args,
            filename: location[0],
            lineno: safeParseInt(location[1]),
            colno: safeParseInt(location[2]),
            stack: line
        })
    });
}

export function parseFFOrSafari(error: Error, options?: StackTraceParseOptions): StackFrame[] {
    return parseFFOrSafariString(error.stack!, options)
}

export function parseFFOrSafariString(stack: string, options?: StackTraceParseOptions): StackFrame[] {
    const lines = applySlice(
        stack.split('\n').filter((line) => {
            return !line.match(SAFARI_NATIVE_CODE_REGEXP)
        }),
        options,
    )

    return lines.map<StackFrame>((line) => {
        // Throw away eval information until we implement stacktrace.js/stackframe#8
        if (line.includes(' > eval'))
            line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1')

        if (!line.includes('@') && !line.includes(':')) {
            // Safari eval frames only have function names and nothing else
            return createStackFrame({
                function: line
            })
        }
        else {
            // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
            const functionNameRegex = /(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/
            const matches = line.match(functionNameRegex)
            const functionName = (matches && matches[1]) ? matches[1] : undefined
            const locationParts = parseLocation(line.replace(functionNameRegex, ''))

            return createStackFrame({
                function: functionName,
                filename: locationParts[0],
                lineno: safeParseInt(locationParts[1]),
                colno: safeParseInt(locationParts[2]),
                stack: line
            })
        }
    })
}

export function parseV8OrIE(error: Error, options?: StackTraceParseOptions): StackFrame[] {
    return parseV8OrIeString(error.stack!, options);
}

export function parseV8OrIeString(stack: string, options?: StackTraceParseOptions): StackFrame[] {
    const lines = applySlice(
        stack.split('\n').filter((line) => {
            return !!line.match(CHROME_IE_STACK_REGEXP)
        }),
        options,
    )

    return lines.map<StackFrame>((line) => {
        if (line.includes('(eval ')) {
            // Throw away eval information until we implement stacktrace.js/stackframe#8
            line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '')
        }
        let sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').replace(/^.*?\s+/, '')

        // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
        // case it has spaces in it, as the string is split on \s+ later on
        const location = sanitizedLine.match(/ (\(.+\)$)/)

        // remove the parenthesized location from the line, if it was matched
        sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine

        // if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
        // because this line doesn't have function name
        const locationParts = parseLocation(location ? location[1] : sanitizedLine)
        const functionName = (location && sanitizedLine) || undefined
        const filename = ['eval', '<anonymous>'].includes(locationParts[0]) ? undefined : locationParts[0]

        return createStackFrame<StackFrame>({
            function: functionName,
            filename,
            lineno: locationParts[1] ? +locationParts[1] : undefined,
            colno: locationParts[2] ? +locationParts[2] : undefined,
            stack: line
        })
    })
}


export function parse<T extends StackEvent = StackEvent>(input: T): StackTrace {
    if (typeof input === 'string') {
        return {
            type: "error",
            message: safeSerialize(input),
        };
    }

    if (isPromiseRejectionEvent(input)) {
        return formattedStack(
            parseStack(input.reason),
            {
                type: input.type,
                stack: input.reason.stack,
                message: input.reason.message,
            })
    }

    if (input instanceof Error) {
        return formattedStack(
            parseStack(input),
            {
                type: 'error',
                stack: input.stack!,
                message: input.message,
            })
    }


    const { target } = input
    if (target instanceof HTMLElement) {
        if (target.nodeType === 1 || target.localName) {
            const frame = {
                type: input.type,
                element: target.localName || target.nodeName.toLowerCase(),
            } as StackTrace;

            switch (target.nodeName.toLowerCase()) {
                case 'link':
                    frame.link = (target as HTMLLinkElement).href
                    break
                default:
                    frame.link =
                        (target as HTMLImageElement).currentSrc ||
                        (target as HTMLScriptElement).src
            }

            frame.message = `Unable to load "${frame.link}"`

            return frame
        }
    }

    if (input instanceof ErrorEvent) {
        const { message, error, lineno, filename, colno, type } = input

        return formattedStack(
            parseStack(input.error),
            {
                message,
                stack: error.stack,
                lineno,
                colno,
                filename,
                type: type || "error event"
            })
    }

    return {
        type: "unknown error",
        message: safeSerialize(input)
    } as StackTrace
}