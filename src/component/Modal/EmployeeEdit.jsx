// import React, { useState } from "react";
// import {
//   Container,
//   makeStyles,
//   Avatar,
//   Typography,
//   Grid,
//   TextField,
//   Paper,
//   FormLabel,
//   FormControlLabel,
//   RadioGroup,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Radio,
//   Button,
//   Checkbox,
// } from "@material-ui/core";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import { useHistory, useParams } from "react-router-dom";
// import EditIcon from "@material-ui/icons/Edit";
// import {
//   useGetEmployeesQuery,
//   useUpdateEmployeeMutation,
// } from "../../redux/redux/usersApi";
// import { toast } from "react-toastify";

// const useStyles = makeStyles((theme) => ({
//   page_content: {
//     margin: theme.spacing(12, 5, 3),
//     padding: theme.spacing(3),
//   },
//   paper: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: theme.spacing(15),
//     marginBottom: theme.spacing(3),
//     padding: theme.spacing(3),
//   },
//   avatar: {
//     backgroundColor: theme.palette.secondary.main,
//     marginRight: theme.spacing(2),
//   },
//   form: {
//     "& .MuiFormControl-root": {
//       width: "80%",
//       margin: theme.spacing(1),
//     },
//   },
//   upload_input: {
//     display: "none",
//   },
//   button: {
//     marginRight: theme.spacing(5),
//   },
// }));

// const department = [
//   { id: 1, title: "React Developer" },
//   { id: 2, title: "Java Developer" },
//   { id: 3, title: "PHP Developer" },
// ];

// const status = [
//   { id: "1", title: "Temporary" },
//   { id: "2", title: "Part Time" },
//   { id: "3", title: "Permanent" },
// ];

// const EmployeeEdit = () => {
//   const classes = useStyles();

//   const history = useHistory();
//   const params = useParams();

//   const { data } = useGetEmployeesQuery();
//   const prevEmployeeData = data;

//   function search(nameKey, myArray) {
//     for (var i = 0; i < myArray.length; i++) {
//       if (myArray[i].id == params.id) {
//         return myArray[i];
//       }
//     }
//   }
//   var resultObject = search(params.id, prevEmployeeData.data);

//   const [employeeData, setEmployeeData] = useState({
//     fname: resultObject.first_name,
//     lname: resultObject.last_name,
//     email: resultObject.email,
//     mobile: resultObject.mobile,
//     landline: resultObject.landline,
//     designation: resultObject.designation_id,
//     gender: resultObject.gender,
//     presentAddress: resultObject.present_address,
//     permenentAddress: resultObject.permanent_address,
//     status: resultObject.status,
//   });

//   const [joiningDate, setjoiningDate] = useState(resultObject.join_date);
//   const [dob, setDob] = useState(resultObject.date_of_birth);
//   const [checkBoxAddress, setCheckBoxAddress] = useState(false);

//   const handleChange = (e) => {
//     setEmployeeData({
//       ...employeeData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const checkBoxAddressChange = (e) => {
//     setCheckBoxAddress(!checkBoxAddress);
//     setEmployeeData({
//       ...employeeData,
//       permenentAddress: employeeData.presentAddress,
//     });
//   };

//   const [updateEmloyee] = useUpdateEmployeeMutation();
//   const result = useGetEmployeesQuery();

//   const employeesFormHandling = (e) => {
//     e.preventDefault();

//     const object = {
//       id: params.id,
//       first_name: employeeData.fname,
//       last_name: employeeData.lname,
//       join_date: new Date(joiningDate).toLocaleDateString(),
//       date_of_birth: new Date(dob).toLocaleDateString(),
//       designation_id: employeeData.designation,
//       gender: employeeData.gender,
//       status: employeeData.status,
//       email: employeeData.email,
//       mobile: employeeData.mobile,
//       landline: employeeData.landline,
//       present_address: employeeData.presentAddress,
//       permanent_address: employeeData.permenentAddress,
//     };

//     updateEmloyee(object)
//       .then((payload) => {
//         toast.success("Successfully edited...", {
//           position: "top-center",
//           autoClose: 1000,
//         });
//         result.refetch();
//         history.push("/employees");
//       })
//       .catch((error) => {
//         toast.error(error.message, {
//           position: "top-center",
//           autoClose: 1000,
//         });
//       });
//   };

//   return (
//     <>
//       <Paper className={classes.page_content}>
//         <Container className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <EditIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Edit Employee
//           </Typography>
//         </Container>
//         <form
//           className={classes.form}
//           autoComplete="off"
//           onSubmit={employeesFormHandling}
//         >
//           <Grid container>
//             <Grid item xs={6}>
//               <TextField
//                 variant="outlined"
//                 label="First Name"
//                 name="fname"
//                 id="fname"
//                 autoFocus
//                 required
//                 value={employeeData.fname}
//                 onChange={handleChange}
//               />
//               <TextField
//                 variant="outlined"
//                 label="Last Name"
//                 name="lname"
//                 id="lname"
//                 required
//                 value={employeeData.lname}
//                 onChange={handleChange}
//               />
//               <TextField
//                 variant="outlined"
//                 label="E-mail Address"
//                 name="email"
//                 id="email"
//                 required
//                 value={employeeData.email}
//                 onChange={handleChange}
//               />
//               <TextField
//                 variant="outlined"
//                 label="Mobile Number"
//                 name="mobile"
//                 id="mobile"
//                 required
//                 value={employeeData.mobile}
//                 onChange={handleChange}
//               />
//               <TextField
//                 variant="outlined"
//                 label="Landline Number"
//                 name="landline"
//                 id="landline"
//                 placeholder="(optional)"
//                 value={employeeData.landline}
//                 onChange={handleChange}
//               />

//               <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 <KeyboardDatePicker
//                   disableToolbar
//                   variant="inline"
//                   inputVariant="outlined"
//                   label="Joining Date"
//                   format="MM/dd/yyyy"
//                   name="joinDate"
//                   value={joiningDate}
//                   onChange={(e) => setjoiningDate(e)}
//                   KeyboardButtonProps={{
//                     "aria-label": "change date",
//                   }}
//                 />
//               </MuiPickersUtilsProvider>
//               <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 <KeyboardDatePicker
//                   disableToolbar
//                   variant="inline"
//                   inputVariant="outlined"
//                   label="Date of Birth"
//                   format="MM/dd/yyyy"
//                   name="dob"
//                   value={dob}
//                   onChange={(e) => setDob(e)}
//                   KeyboardButtonProps={{
//                     "aria-label": "change date",
//                   }}
//                 />
//               </MuiPickersUtilsProvider>

//               <FormControl variant="outlined">
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   label="status"
//                   name="status"
//                   onChange={handleChange}
//                   value={employeeData.status}
//                 >
//                   {status.map((item) => (
//                     <MenuItem key={item.id} value={item.title}>
//                       {item.title}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <div style={{ margin: "10px 10px" }}>
//                 <Grid container>
//                   <Grid item xs={1} className={classes.button}>
//                     <Button variant="contained" color="primary" type="submit">
//                       Submit
//                     </Button>
//                   </Grid>
//                   <Grid item xs={1} className={classes.button}>
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       type="button"
//                       onClick={() => history.push("/employees")}
//                     >
//                       Cancel
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </div>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl variant="outlined">
//                 <InputLabel>Designation</InputLabel>
//                 <Select
//                   label="Designation"
//                   name="designation"
//                   onChange={handleChange}
//                   value={employeeData.designation}
//                 >
//                   <MenuItem value="">None</MenuItem>

//                   {department.map((item) => (
//                     <MenuItem key={item.id} value={item.id}>
//                       {item.title}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Gender</FormLabel>
//                 <RadioGroup
//                   name="gender"
//                   value={employeeData.gender}
//                   onChange={handleChange}
//                   row
//                 >
//                   <FormControlLabel
//                     value="male"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     value="female"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                 </RadioGroup>
//               </FormControl>
//               <TextField
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 label="Present Address"
//                 name="presentAddress"
//                 id="presentAddress"
//                 required
//                 value={employeeData.presentAddress}
//                 onChange={handleChange}
//               />
//               <FormControl>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="checkSameAddress"
//                       checked={checkBoxAddress}
//                       onChange={checkBoxAddressChange}
//                       color="primary"
//                     />
//                   }
//                   label="Same as Present Address"
//                 />
//               </FormControl>
//               <TextField
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 label="Permanent Address"
//                 name="permenentAddress"
//                 id="permenentAddress"
//                 required
//                 value={
//                   checkBoxAddress
//                     ? employeeData.presentAddress
//                     : employeeData.permenentAddress
//                 }
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </>
//   );
// };

// export default EmployeeEdit;

import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Button,
  Checkbox,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";
import {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../redux/redux/usersApi";
import { toast } from "react-toastify";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../FormUI/Textfield";
import RadioForm from "../FormUI/RadioForm";
import Select from "../FormUI/Select";
import FileInput from "../FormUI/FileInput";
import DateTime from "../FormUI/DateTimePicker";

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

const EmployeeEdit = () => {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();

  const { data } = useGetEmployeesQuery();
  const prevEmployeeData = data;

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == params.id) {
        return myArray[i];
      }
    }
  }
  var resultObject = search(params.id, prevEmployeeData.data);
  const INITIAL_FORM_STATE = {
    first_name: resultObject.first_name,
    last_name: resultObject.last_name,
    email: resultObject.email,
    mobile: resultObject.mobile,
    landline: resultObject.landline,
    designation_id: resultObject.designation_id,
    gender: resultObject.gender,
    present_address: resultObject.present_address,
    permanent_address: resultObject.permanent_address,
    status: resultObject.status,
    join_date: resultObject.join_date,
    date_of_birth: resultObject.date_of_birth,
  };
  const FORM_VALIDATION = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    present_address: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    permanent_address: Yup.string().required("Required"),
    mobile: Yup.number().required("Required"),
    landline: Yup.number().required("Required"),
    join_date: Yup.date().nullable().required("Required"),
    date_of_birth: Yup.date().nullable().required("Required"),
    designation_id: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  const [checkBoxAddress, setCheckBoxAddress] = useState(false);

  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
  };

  const [updateEmloyee] = useUpdateEmployeeMutation();
  const result = useGetEmployeesQuery();

  return (
    <>
      <Paper className={classes.page_content}>
        <Container className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Employee
          </Typography>
        </Container>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log("clicked");
            const object = {
              id: params.id,
              first_name: values.first_name,
              last_name: values.last_name,
              join_date: new Date(values.join_date).toLocaleDateString(),
              date_of_birth: new Date(
                values.date_of_birth
              ).toLocaleDateString(),
              designation_id: values.designation_id.toString(),
              gender: values.gender,
              status: values.status,
              email: values.email,
              mobile: values.mobile,
              landline: values.landline,
              present_address: values.present_address,
              permanent_address: values.permanent_address,
            };

            updateEmloyee(object)
              .then((payload) => {
                toast.success("Successfully added...", {
                  position: "top-center",
                  autoClose: 1000,
                });
                result.refetch();
                history.push("/employees");
                console.log(payload);
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
                <div>
                  <Grid container spacing={2} className={classes.buttons}>
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="button"
                        color="secondary"
                        variant="outlined"
                        component="label"
                        onClick={() => history.push("/employees")}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </>
  );
};

export default EmployeeEdit;
