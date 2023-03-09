export type SideBarItemProps = {
  displayText: string;
  linkTarget: string;
  VisibleIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }>;
}