module.exports = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com", // Allow drive.google.com
        pathname: "/uc", // Ensure it works with the export=view
      },
    ],
  },
};
