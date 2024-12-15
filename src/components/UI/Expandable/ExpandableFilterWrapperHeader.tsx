import ExpandableWrapperHeader, {
  type ExpandableWrapperHeaderProps,
} from "./ExpandableWrapperHeader";

export type FilterWrapperHeaderProps = ExpandableWrapperHeaderProps & {
  heading: string;
};

export const ExpandableFilterWrapperHeader = ({
  heading,
  ...props
}: FilterWrapperHeaderProps) => (
  <ExpandableWrapperHeader
    {...props}
    headingClassName="flex w-full items-center justify-between p-2"
  >
    {<p className="font-bold">{heading}</p>}
  </ExpandableWrapperHeader>
);

export default ExpandableFilterWrapperHeader;
