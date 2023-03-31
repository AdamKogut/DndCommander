export type SideBarItemProps = {
  displayText: string;
  linkTarget: string;
  VisibleIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element//React.FC<React.SVGProps<SVGSVGElement>>
  // VisibleIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
  //   title?: string | undefined;
  // }>;
}