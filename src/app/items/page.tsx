"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Const";

//UI
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  TextField,
  Button,
  Autocomplete,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import CustomSnack from "@/components/CustomSnack";
import { ApiCallerGet, printHello } from "@/components/CustomApiCaller";

const Items = () => {
  const [itemList, setItemList] = useState<any>([]);
  const [itemList2, setItemList2] = useState<any>([]);
  const [itemDialog, setItemDialog] = useState<boolean>(false);
  const [item, setItem] = useState<any>({});
  const [search, setSearch] = useState<any>("");
  const [snack, setSnack] = useState<any>({
    value: false,
    msg: "",
    type: "success",
  });
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    handleGetItems();
  }, []);

  const itemOptions = [
    {
      value: "NorthIndian",
      label: "NorthIndian",
    },
    {
      value: "SouthIndian",
      label: "SouthIndian",
    },
    {
      value: "SeaFood",
      label: "SeaFood",
    },
    {
      value: "Continental",
      label: "Continental",
    },
  ];

  const handleGetItems = async () => {
    let abc = await ApiCallerGet("items");
    setItemList(abc ?? []);
    setItemList2(abc ?? []);
    console.log(abc, "abc");
  };

  const handleData = (e) => {
    console.log(e, "e");
    let txt = e.target.value;
    setItem({
      ...item,
      [e.target.name]: txt ?? "",
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    let data: any = {
      name: item?.name,
      price: item?.price,
      category: item?.category?.value,
      img: "",
      note: "",
    };

    if (!item?.name) {
      setLoading(false);
      return setSnack({
        value: true,
        msg: "name required",
        type: "error",
      });
    }
    if (!item?.price) {
      setLoading(false);
      return setSnack({
        value: true,
        msg: "price required",
        type: "error",
      });
    }
    if (!item?.category?.value) {
      setLoading(false);
      return setSnack({
        value: true,
        msg: "category required",
        type: "error",
      });
    }

    if (item._id) {
      data._id = item._id;
      axios
        .put(BASE_URL + "editItem/" + item._id, data)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            setLoading(false);
            setSnack({
              value: true,
              msg: "Item Edited",
              type: "success",
            });
            closeItemDialog();
            handleGetItems();
          } else {
            setLoading(false);
            setSnack({
              value: true,
              msg: "Item Edited failed",
              type: "error",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          throw new Error(err);
        });
    } else {
      axios
        .post(BASE_URL + "addItem", data)
        .then((res) => {
          if (res.data) {
            setLoading(false);
            setSnack({
              value: true,
              msg: "Item created",
              type: "success",
            });
            closeItemDialog();
            handleGetItems();
          } else {
            setLoading(false);
            setSnack({
              value: true,
              msg: "Item creation failed",
              type: "error",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          throw new Error(err);
        });
    }
  };

  const closeItemDialog = () => {
    setItemDialog(false);
    setItem({});
    setSearch("");
  };

  const handleSearch = (txt) => {
    setSearch(txt.toLowerCase());
    let result = itemList2?.filter((a) => {
      return (
        a?.name?.toLowerCase().includes(txt) ||
        a?.category?.toLowerCase().includes(txt) ||
        a?.price?.toString().toLowerCase().includes(txt)
      );
    });
    setItemList(result);
  };
  return (
    <div>
      <div className="flexSpaceBetween">
        <h2>ItemList</h2>
        <div className="flex" id="searchContainer">
          <SearchIcon style={{ marginRight: "6px" }} />
          <input
            placeholder="Search.."
            id="searchField"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button variant="contained" onClick={(e) => setItemDialog(true)}>
          Add item
        </Button>
      </div>
      {itemList2?.length > 0 ? (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList?.length > 0 ? (
                itemList?.map((a) => {
                  return (
                    <TableRow>
                      <TableCell>{a?.name}</TableCell>
                      <TableCell>{a?.category}</TableCell>
                      <TableCell>{a?.price}</TableCell>
                      <TableCell>
                        <EditIcon
                          fontSize="small"
                          className="pointer"
                          onClick={() => {
                            setItemDialog(true);
                            setItem(a);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <h4>No item Found</h4>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="flex">
          Items Loading ...
          <CircularProgress style={{ marginLeft: "8px" }} />
        </div>
      )}

      <Dialog
        open={itemDialog}
        onClose={() => closeItemDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <div className="dialogTitle">
          <h4> {item?._id ? "Edit" : "Add"} Item</h4>
          <CloseIcon className="pointer" onClick={() => closeItemDialog()} />
        </div>
        <DialogContent>
          <form className="dialogForm" onSubmit={(e) => handleSave(e)}>
            <TextField
              variant="outlined"
              fullWidth={true}
              label="Name"
              name="name"
              value={item.name}
              onChange={(e) => handleData(e)}
              color={item?.name ? "primary" : "error"}
            />
            <TextField
              variant="outlined"
              fullWidth={true}
              label="Price"
              name="price"
              type="Number"
              color={item?.price ? "primary" : "error"}
              value={item.price}
              onChange={(e) => handleData(e)}
            />
            <Autocomplete
              options={itemOptions}
              fullWidth={true}
              value={item.category}
              onChange={(e, value) =>
                setItem({
                  ...item,
                  category: value,
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  color={item?.category?.value ? "primary" : "error"}
                />
              )}
            />
          </form>
        </DialogContent>
        <div className="dialogFooter">
          <Button
            style={{ width: "50%" }}
            variant="contained"
            onClick={(e) => handleSave(e)}
          >
            Save{" "}
            {loading ? (
              <CircularProgress
                style={{ marginLeft: "10px", color: "white" }}
                size={20}
              />
            ) : (
              ""
            )}
          </Button>
        </div>
      </Dialog>

      <CustomSnack
        openSnack={snack.value}
        handleClose={() => setSnack({ ...snack, value: false })}
        msg={snack.msg}
        type={snack.type}
      />
    </div>
  );
};

export default Items;
