export namespace Console {
  const timeFormat = process.env.TIME_FORMAT || "en-US";

  export const Log = (message: string) => {
    const time = new Date().toLocaleTimeString(timeFormat);
    console.log(`\x1b[32m[OK - ${time}] ${message}\x1b[0m`);
  };

  export const Warn = (message: string) => {
    const time = new Date().toLocaleTimeString(timeFormat);
    console.log(`\x1b[33m[WARN - ${time}] ${message}\x1b[0m`);
  };

  export const Error = (message: string) => {
    const time = new Date().toLocaleTimeString(timeFormat);
    console.log(`\x1b[31m[ERROR - ${time}] ${message}\x1b[0m`);
  };
}
