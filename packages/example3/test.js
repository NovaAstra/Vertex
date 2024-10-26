import https from "https";
import querystring from "querystring";
import url from "url";
import fs from "fs";

const options = {
  key: fs.readFileSync('./localhost-key.pem'), // 私钥路径
  cert: fs.readFileSync('./localhost.pem'), // 证书路径
};

const port = 3007;

const server = https.createServer(options,onRequest);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});



function onRequest(req, res) {
  const originUrl = url.parse(req.url);
  const qs = querystring.parse(originUrl.query);
  const targetUrl = qs["target"];
 
  if (!targetUrl) {
    console.log(targetUrl)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bad Request: Missing target URL");
    return;
  }


  const target = url.parse(targetUrl);

    const options = {
      hostname: target.hostname,
      port: 443,
      path: url.format(target),
      method: "GET",
      headers: req.headers,
      rejectUnauthorized: false
    };
  

    const proxy = https.request(options, _res => {
   
      const fieldsToRemove = ["x-frame-options", "content-security-policy"];
      Object.keys(_res.headers).forEach(field => {
        if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
          res.setHeader(field, _res.headers[field]);
        }
      });
      // res.writeHead(_res.statusCode);
      _res.pipe(res, { end: true });
    });
  
    proxy.on("error", err => {
      console.error("Proxy error:", err);
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Bad Gateway");
    });
  
    req.pipe(proxy, {
      end: true
    });
 
}