import { FormSection } from "../../sections/form-section";

type Props = {
  id: string;
};
export const VideoView = ({ id }: Props) => {
  return (
    <div className="px-4 pt-2.5 max-w-screen-lg mx-auto">
      <FormSection id={id} />
    </div>
  );
};
