type CheckBoxProps = {
  label: string;
  selected?: boolean;
  onChange?: (checked: boolean, label: string) => void;
};

type RadioProps = {
  label: string;
  selected?: boolean;
  onChange?: (selectedLabel: string) => void;
  name: string;
};

const CheckBox = ({
  label,
  selected = false,
  onChange = () => {},
}: CheckBoxProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({
  label,
  selected = false,
  onChange = () => {},
}: RadioProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        // name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

export { CheckBox, RadioButton };
