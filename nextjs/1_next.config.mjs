import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const securityHeaders = [
  // { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  output: "standalone",
  httpAgentOptions: {
    keepAlive: false,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

const devEnv = {
  env: {
    apiHost: "http://127.0.0.1:1337/api",
  },
  // env: {
  //   apiHost: "https://fliben.ru/fliben-strapi/api",
  //   host: "https://fliben.ru",
  // },
};

const prodEnv = {
  env: {
    apiHost: "https://fliben.ru/fliben-strapi/api",
    host: "https://fliben.ru",
  },
};

const devRewrites = {
  async rewrites() {
    return [
      {
        source: "/files/:path*",
        destination: `http://127.0.0.1:1337/:path*`,
      },
      // {
      //     source: "/files/:path*",
      //     destination: `http://89.111.141.25/fliben-strapi/:path*`,
      // },
    ];
  },
};

const prodRewrites = {
  async rewrites() {
    return [
      {
        source: "/files/:path*",
        destination: `https://fliben.ru/fliben-strapi/:path*`,
      },
    ];
  },
};

const nextDevConfig = { ...nextConfig, ...devEnv, ...devRewrites };
const nextProdConfig = { ...nextConfig, ...prodEnv, ...prodRewrites };

export default (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) return nextDevConfig;

  return nextProdConfig;
};
