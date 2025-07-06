/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "host-app/GlobalContext" {
  export function useGlobalState(): any;
  export default function GlobalContextWrapper({ children }: any): any;
}
