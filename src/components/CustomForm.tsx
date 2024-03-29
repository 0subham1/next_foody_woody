// const subjectOptions = [
//   { value: "science", label: "science" },
//   { value: "maths", label: "maths" },
// ];

// const formMetaData: any = [
//   {
//     value: "",
//     label: "Name",
//     type: "text",
//     component: "textField",
//   },
//   {
//     value: "0",
//     label: "Age",
//     type: "Number",
//     component: "textField",
//   },
//   {
//     value: "",
//     label: "subjects",
//     type: "text",
//     component: "autoComplete",
//     options: subjectOptions,
//   },
// ];
// <CustomForm handleSave={handleSave} formMetaData={formMetaData} />;

//CustomForm
import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const CustomForm = ({ handleSave, formMetaData }) => {
  const [formData, setFormData] = useState<any>(formMetaData ?? []);

  const handleData = (e, value, i) => {
    let txt = e?.target?.value;
    console.log(txt, "txt");
    console.log(i, "i");
    console.log(value, "value");
    let obj = [...formMetaData];
    if (value?.label) {
      obj[i].value = value;
    } else {
      obj[i].value = txt;
    }
    setFormData(obj);
  };
  const handleDataBlur = (e, value, i) => {
    let txt = e?.target?.value;
    console.log(txt, "txt");
    console.log(i, "i");
    console.log(value, "value");
    // let obj = [...formMetaData];
    // if (value?.label) {
    //   obj[i].value = value;
    // } else {
    //   obj[i].value = txt;
    // }
    // setFormData(obj);
  };

  useEffect(() => {
    console.log(formData, "formData");
    console.log(formMetaData, "formMetaData");
  }, [formData]);

  const handleDataProcess = () => {
    let obj: any = {};
    formData?.map((a) => {
      obj = { ...obj, [a.label]: a?.value };
    });
    console.log(obj);
    handleSave(obj);
  };

  const handleClear = () => {
    setFormData(formMetaData);
  };
  return (
    <div style={{ padding: "10px" }}>
      {formData &&
        formData?.map((a, i) => {
          return (
            <div style={{ margin: "10px", width: "30vw" }}>
              {a?.component == "autoComplete" ? (
                <Autocomplete
                  fullWidth={true}
                  autoHighlight
                  size="small"
                  value={a.value}
                  options={a?.options}
                  onChange={(e, value) => handleData(e, value, i)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onBlur={(e) => handleDataBlur(e, "", i)}
                      error={a.value == null ? true : false}
                    />
                  )}
                />
              ) : (
                <TextField
                  size="small"
                  fullWidth={true}
                  value={a.value}
                  error={a.value == null ? true : false}
                  type={a?.type}
                  variant="outlined" //'outlined' | 'standard' | 'filled'
                  label={a?.label ?? "txtField"}
                  placeholder={"Enter" + a?.label}
                  onChange={(e) => handleData(e, "", i)}
                  onBlur={(e) => handleDataBlur(e, "", i)}
                  // onBlur={(e) => handleAccNoBlur(e, i)}
                />
              )}
            </div>
          );
        })}
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDataProcess()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CustomForm;
