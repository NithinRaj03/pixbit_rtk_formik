import React from "react";
import { TextField } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const TextfieldWrapper = ({ name, isChecked, ...otherProps }) => {
    const { values } = useFormikContext();

    const [field, mata] = useField(name);

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: "outlined",
    };

    if (isChecked) {
        configTextfield.value = values.present_address;
    }

    if (mata && mata.touched && mata.error) {
        configTextfield.error = true;
        configTextfield.helperText = "Required";
    }

    return <TextField {...configTextfield }
    />;
};

export default TextfieldWrapper;