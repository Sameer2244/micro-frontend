// global.d.ts
declare module "host-app/GlobalContext" {
  export function useGlobalState(): any;
  export default function GlobalContextWrapper({ children }: any): any;
}

declare module "host-app/Link" {
  export default function Link({ children }: any): any;
}

declare module "host-app/useNavigate" {
  export function customNavigate(): any;
}
