import https from "https";
import querystring from "querystring";
import url from "url";
import fs from "fs";

const options = {
  key: fs.readFileSync('./localhost-key.pem'), // 私钥路径
  cert: fs.readFileSync('./localhost.pem'), // 证书路径
};


const port = 3001;

const server = https.createServer(options);

server.on("request", onRequest)
// 1.创建代理服务
server.listen(port, () => {
  console.log(`Proxy server is listening on port ${port}`);
});


function onRequest(req, res) {
  const originUrl = url.parse(req.url);
  const qs = querystring.parse(originUrl.query);
  const targetUrl = qs["target"] || '';
 

  const target = url.parse(targetUrl);

    const options = {
      hostname: target.hostname,
      port: 443,
      path: url.format(target),
      method: "GET",
      headers: req.headers,
      rejectUnauthorized: false
    };
  
    // 2.代发请求
    const proxy = https.request(options, _res => {
      // 3.修改响应头
      const fieldsToRemove = ["x-frame-options", "content-security-policy"];
      Object.keys(_res.headers).forEach(field => {
        if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
          res.setHeader(field, _res.headers[field]);
        }
      });
      _res.pipe(res, { end: true });
    });
  
    proxy.on("error", err => {
      console.error("Proxy error:", err);
    
    });
  
    req.pipe(proxy, {
      end: true
    });


 
}