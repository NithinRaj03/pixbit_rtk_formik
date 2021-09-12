import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { GridToolbarContainer } from "@mui/x-data-grid-pro";

import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Grid, LinearProgress, Paper, Typography } from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useDeleteDesignationMutation,
  useGetDesignationsQuery,
} from "../redux/redux/usersApi";

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(12, 4, 3),
      padding: theme.spacing(3, 4),
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    grid_items_left: {
      marginLeft: theme.spacing(3),
    },
    grid_items_right: {
      marginRight: theme.spacing(3),
    },
  }),
  { defaultTheme }
);

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

function RowMenuCell(props) {
  const history = useHistory();

  const { id } = props;
  const classes = useStyles();

  const [deleteDesignations] = useDeleteDesignationMutation();
  const result = useGetDesignationsQuery();

  const handleEditClick = (id) => {
    history.push(`/designations/${id}/edit`);
  };

  const handleDelete = (id) => {
    deleteDesignations(id)
      .then((res) => {
        toast.success("Successfully deleted...", {
          position: "top-center",
          autoClose: 1000,
        });
        result.refetch();
        history.push(`/designations`);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={() => handleEditClick(id)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={() => handleDelete(id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default function Designations() {
  const classes = useStyles();
  const { data, isLoading } = useGetDesignationsQuery();
  const [pageSize, setPageSize] = useState(5);

  const designationData = data;

  const rows =
    (data &&
      designationData.data.map((item, index) => {
        return { keys: index + 1, id: item.id, name: item.name };
      })) ||
    [];

  const columns = [
    { field: "keys", headerName: "Sl No", width: 280 },
    {
      field: "name",
      headerName: "Designation name",
      width: 900,
      align: "left",
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: RowMenuCell,
      sortable: false,
      width: 150,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  return (
    <>
      <Paper className={classes.paper}>
        <Grid
          container
          className={classes.title}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item className={classes.grid_items_left}>
            <Typography variant="h6" component="h1">
              Designations List
            </Typography>
          </Grid>
          <Grid item className={classes.grid_items_right}>
            <GridToolbarContainer>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
              >
                <NavLink
                  to="/designations/create"
                  className="link"
                  style={{ color: "#000" }}
                  activeClassName="active"
                >
                  Create Designation
                </NavLink>
              </Button>
            </GridToolbarContainer>
          </Grid>
        </Grid>
        <div
          className={classes.border}
          style={{ height: "60vh", width: "100%" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
            loading={isLoading}
          />
        </div>
      </Paper>
    </>
  );
}
