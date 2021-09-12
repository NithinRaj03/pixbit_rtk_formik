import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Button,
  Paper,
  Avatar,
} from "@material-ui/core";

import { useState } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../component/FormUI/Textfield";
import RadioForm from "../component/FormUI/RadioForm";
import Select from "../component/FormUI/Select";
import FileInput from "../component/FormUI/FileInput";
import DateTime from "../component/FormUI/DateTimePicker";
import {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
} from "../redux/redux/usersApi";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  page_content: {
    margin: theme.spacing(12),
    padding: theme.spacing(3),
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  field: {
    "& .MuiInputBase-root": {
      width: "80%",
      margin: theme.spacing(2, 1, 3),
    },
  },
  buttons: {
    marginLeft: theme.spacing(0),
  },
  box: {
    margin: theme.spacing(2, 0, 2),
  },
  checkbox: {
    margin: theme.spacing(2, 1, 3),
  },
}));

const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  mobile: null,
  landline: null,
  email: "",
  join_date: null,
  date_of_birth: null,
  status: null,
  gender: null,
  profile_picture: null,
  resume: null,
  present_address: "",
  permanent_address: "",

  designation_id: null,
};
const FORM_VALIDATION = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  present_address: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  permanent_address: Yup.string().required("Required"),
  mobile: Yup.number().required("Required"),
  landline: Yup.number(),
  join_date: Yup.date().nullable().required("Required"),
  date_of_birth: Yup.date().nullable().required("Required"),
  designation_id: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  profile_picture: Yup.mixed().required("Required"),
  resume: Yup.mixed().required("Required"),
});

const AddEmployee = () => {
  const history = useHistory();

  const [checkBoxAddress, setCheckBoxAddress] = useState(false);

  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
  };

  const [createEmployee] = useCreateEmployeeMutation();
  const result = useGetEmployeesQuery();

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.page_content}>
        <Container className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Employee
          </Typography>
        </Container>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            const formData = new FormData();
            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append(
              "join_date",
              new Date(values.join_date).toLocaleDateString()
            );
            formData.append(
              "date_of_birth",
              new Date(values.date_of_birth).toLocaleDateString()
            );
            formData.append("designation_id", values.designation_id);
            formData.append("gender", values.gender);
            formData.append("status", values.status);
            formData.append("email", values.email);
            formData.append("mobile", values.mobile);
            formData.append("landline", values.landline);
            formData.append("present_address", values.present_address);
            formData.append("permanent_address", values.permanent_address);
            formData.append(
              "profile_picture",
              values.profile_picture,
              values.profile_picture?.name || ""
            );
            formData.append("resume", values.resume, values.resume?.name);

            createEmployee(formData)
              .then((payload) => {
                toast.success("Successfully added...", {
                  position: "top-center",
                  autoClose: 1000,
                });
                result.refetch();
                history.push("/employees");
              })
              .catch((error) => {
                toast.error(error.message, {
                  position: "top-center",
                  autoClose: 1000,
                });
              });
          }}
        >
          <Form autoComplete="off">
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  className={classes.field}
                  name="first_name"
                  label="First Name"
                />
                <TextField
                  className={classes.field}
                  name="last_name"
                  label="Last Name"
                />
                <TextField
                  className={classes.field}
                  name="email"
                  label="Email"
                />
                <TextField
                  className={classes.field}
                  name="mobile"
                  label="Mobile"
                />
                <TextField
                  className={classes.field}
                  name="landline"
                  label="Landline"
                />
                <DateTime
                  className={classes.field}
                  name="join_date"
                  label="Joing Date"
                />
                <DateTime
                  className={classes.field}
                  name="date_of_birth"
                  label="Date of Birth"
                />
                <Select
                  className={classes.field}
                  name="designation_id"
                  label="designation"
                  options={[
                    { id: 1, title: "React Developer" },
                    { id: 2, title: "Java Developer" },
                    { id: 3, title: "PHP Developer" },
                  ]}
                />
                <Select
                  className={classes.field}
                  label="Status"
                  name="status"
                  options={[
                    { id: "1", title: "Temporary" },
                    { id: "2", title: "Part Time" },
                    { id: "3", title: "Permanent" },
                  ]}
                />

                <div>
                  <Grid container spacing={2} className={classes.buttons}>
                    <Grid item>
                      <Button type="submit" color="primary" variant="contained">
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        variant="contained"
                        component="label"
                        onClick={() => history.push("/employees")}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={6}>
                <RadioForm row name="gender" className={classes.box} />
                <TextField
                  className={classes.field}
                  name="present_address"
                  label="Present Address"
                  multiline
                  rows={4}
                />
                <FormControlLabel
                  className={classes.box}
                  control={
                    <Checkbox
                      checked={checkBoxAddress}
                      onChange={checkBoxAddressChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Same as present Address"
                />
                <TextField
                  className={classes.field}
                  name="permanent_address"
                  label="Permenent Address"
                  multiline
                  rows={4}
                  isChecked={checkBoxAddress}
                />
                <FileInput
                  className={classes.field}
                  name="profile_picture"
                  label="Profile Picture"
                />
                <FileInput
                  className={classes.field}
                  name="resume"
                  label="Resume"
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </>
  );
};

export default AddEmployee;
