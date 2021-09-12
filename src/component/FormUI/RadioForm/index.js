import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
const RadioForm = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const configRadio = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  return (
    <>
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        {meta.error && (
          <span style={{ color: "red" }}>please select a gender</span>
        )}

        <RadioGroup {...configRadio}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default RadioForm;
