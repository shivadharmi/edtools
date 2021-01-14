import devKeys from "./dev";
import prodKeys from "./prod";
let keys: {
  awsKeys: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

if (process.env.NODE_ENV === "development") {
  keys = devKeys;
} else {
  keys = prodKeys;
}

export default keys;
