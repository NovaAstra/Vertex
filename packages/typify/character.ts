export type UpperCaseCharacters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Whitespace =
    | '\u{9}'
    | '\u{A}'
    | '\u{B}'
    | '\u{C}'
    | '\u{D}'
    | '\u{20}'
    | '\u{85}'
    | '\u{A0}'
    | '\u{1680}'
    | '\u{2000}'
    | '\u{2001}'
    | '\u{2002}'
    | '\u{2003}'
    | '\u{2004}'
    | '\u{2005}'
    | '\u{2006}'
    | '\u{2007}'
    | '\u{2008}'
    | '\u{2009}'
    | '\u{200A}'
    | '\u{2028}'
    | '\u{2029}'
    | '\u{202F}'
    | '\u{205F}'
    | '\u{3000}'
    | '\u{FEFF}';

export type WordSeparators = '-' | '_' | Whitespace;
