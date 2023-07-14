import SettingComponentSet from "../components/Setting/SettingComponentSet";
import React, { useContext } from "react";
import SettingComponentPreview from "../components/Setting/SettingComponentPreview";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { actions, StoreContext } from "../store";
import Button from "@mui/material/Button";
import { payloadObject } from "../store/actions";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import FormControl from "@mui/material/FormControl";
import { useCallback } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import SaveSetting from "../components/Setting/SaveSetting";
import { defaultFormSetting } from "../components/Setting/FormSetting";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    overflow: "auto",
    // top: "1rem",
    // maxWidth: "600"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Setting = () => {
  const fetch = useAuthenticatedFetch();
  const { state, dispatch } = useContext(StoreContext);
  const localFormSetting = {
    ...defaultFormSetting,
    ...state.setting,
    ...state.currentSetting,
  };
  // console.log("LocalFormSetting", localFormSetting)
  const setSection = (sections: payloadObject[]) => {
    sections.map((section) => {
      dispatch(actions.setSettingTab(section));
    });
  };

  const settingComponentSet = (
    <CardContent>
      <SettingComponentSet />
    </CardContent>
  );
  const settingComponentPreview = (
    <CardContent>
      <SettingComponentPreview />
    </CardContent>
  );
  // const handleSubmit = useCallback(() => {
  //     const data = localFormSetting
  //     console.log("handleSubmit")
  //     console.log("data frontend", data)
  // }, [])
  // const handleSubmit = () => {
  //     const data = localFormSetting
  //     console.log("handleSubmit")
  //     console.log("data frontend", data)
  // }

  // const data = fetch("/api/quote-entity", {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(dataPost)
  // })
  // fetch("/api/quote-entity", {method: "Post"}).then((data: Response): void => {
  //     console.log("data", data)
  //     const res: Promise<Response> = new Promise((resolve, reject) => {
  //         resolve(data.json())
  //     })
  //     res.then((value: Response) => console.log("value:", value))
  // });
  const setting = state.currentSetting;
  console.log("state.currentSetting", state.currentSetting);
  // const data =localFormSetting
  const {
    data: data,
    refetch: refetchQuote,
    isLoading: isLoadingQuote,
    isRefetching: isRefetchingQuote,
  } = useAppQuery({
    url: "/api/quote-entity",
    reactQueryOptions: {
      onSuccess: () => {
        let returnData = data as Object[];
        console.log("returnData", returnData);
        if (returnData) {
          returnData.map((entity: any) => {
            console.log("entity", entity);
            switch (entity.name) {
              case "name":
                setting.name_title = entity.label || "";
                setting.name_placeholder = entity.value || "";
                break;
              case "email":
                setting.email_title = entity.label || "";
                setting.email_placeholder = entity.value || "";
                break;
              case "message":
                setting.message_title = entity.label || "";
                setting.message_placeholder = entity.value || "";
                break;

              default:
                // setting[data.name] = entity.value;
                break;
            }
            // console.log("data", data)
            dispatch(actions.setInitSetting(setting));
          });
        }
      },
    },
  });

  const classes = useStyles();
  return (
    <React.Fragment>
      {/*<ValidatorForm onSubmit={handleSubmit}>*/}
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid
          container
          item
          sx={{
            mt: 1,
            position: "fixed",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {/*<Card*/}
          {/*    className={classes.root} elevation={15}>*/}
          {/*    <CardContent>*/}
          {/*        <Typography*/}
          {/*            className={classes.title}*/}
          {/*            color="textSecondary"*/}
          {/*            gutterBottom*/}
          {/*        >*/}
          {/*            Shopping Cart*/}
          {/*        </Typography>*/}
          {/*    </CardContent>*/}
          {/*</Card>*/}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            {/*// <Card variant="outlined" sx={{ display:"flex" ,justifyContent:"flex-end" ,alignItems :"flex-end" }} >*/}
            <SaveSetting />
            {/*<Button variant="contained" sx={{m: 0.2}} type="submit">Save all</Button>*/}
            <Button
              variant="contained"
              sx={{ m: 0.2 }}
              onClick={() => {
                console.log("click");
                !state.settingTab.includes("configSetting")
                  ? setSection([
                      { add: true, tab: "configSetting" },
                      { add: false, tab: "formSetting" },
                      { add: false, tab: "thanksSetting" },
                    ])
                  : setSection([
                      { add: false, tab: "formSetting" },
                      { add: true, tab: "configSetting" },
                      { add: false, tab: "thanksSetting" },
                    ]);
              }}
            >
              General Setting
            </Button>
            <Button
              variant="contained"
              sx={{ m: 0.2 }}
              onClick={() => {
                console.log("click");
                !state.settingTab.includes("formSetting")
                  ? setSection([
                      { add: true, tab: "formSetting" },
                      { add: false, tab: "configSetting" },
                      { add: false, tab: "thanksSetting" },
                    ])
                  : setSection([
                      { add: true, tab: "formSetting" },
                      { add: false, tab: "configSetting" },
                      { add: false, tab: "thanksSetting" },
                    ]);
              }}
            >
              Form Fields
            </Button>
            <Button
              variant="contained"
              sx={{ m: 0.2 }}
              onClick={() => {
                console.log("click");
                !state.settingTab.includes("thanksSetting")
                  ? setSection([
                      { add: true, tab: "thanksSetting" },
                      { add: false, tab: "configSetting" },
                      { add: false, tab: "formSetting" },
                    ])
                  : setSection([
                      { add: true, tab: "thanksSetting" },
                      { add: false, tab: "configSetting" },
                      { add: false, tab: "formSetting" },
                    ]);
              }}
            >
              Thanks Page Setting
            </Button>
            {/*</Card>*/}
          </Box>
        </Grid>

        <Grid
          container
          item
          spacing={1}
          sx={{ mt: 6.2, mx: 0.5, width: "100%" }}
        >
          <Grid item xs={7} sx={{ width: "100%" }}>
            {/*<div style={{*/}
            {/*    maxHeight: '80vh',*/}
            {/*    position: 'fixed',*/}
            {/*    width: '57%',*/}
            {/*    overflow: "auto",*/}
            {/*    marginBottom: 0.2*/}
            {/*}}>*/}
            <Card className={classes.root}>{settingComponentSet}</Card>
            {/*</div>*/}
          </Grid>
          <Grid item xs={5} sx={{ width: "100%", overflow: "auto" }}>
            <div style={{ maxHeight: "80vh", overflow: "auto" }}>
              <Card>{settingComponentPreview}</Card>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {/*</Container>*/}
      {/*</Box>*/}

      {/*</ValidatorForm>*/}
    </React.Fragment>
  );
};

export default Setting;
