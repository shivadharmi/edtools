const prodKeys = {
  awsKeys: {
    accessKeyId: process.env.EDTOOLS_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.EDTOOLS_AWS_SECRET_ACCESS_KEY as string,
  },
};
export default prodKeys;
