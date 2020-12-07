import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Container,
  Paper,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';
import { NtweetOptions } from '../atoms/constants';

const useStyles = makeStyles({
  interval: {
    marginTop: '16px',
  },
  paper: {
    padding: '24px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  errorMessage: {
    fontSize: '0.8rem',
    color: '#F44036',
    marginTop: '8px',
  },
});

// TODO proptypes による型チェック
// TODO バリデーションをもっと作り込む
const UserAndNtweetsForm = ({ analysisType }) => {
  const classes = useStyles();

  const setInputValues = (values) => {
    window.Shiny.setInputValue('user', values.user);
    window.Shiny.setInputValue('ntweets', values.ntweets);
    window.Shiny.setInputValue('analysisType', values.analysisType);
  };

  return (
    <Formik
      initialValues={{
        user: '',
        ntweets: 400,
        analysisType: analysisType,
      }}
      validationSchema={Yup.object({
        user: Yup.string().required('必須項目です'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // JS to R
        setInputValues(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Container style={{ marginTop: '66px' }} maxWidth="sm">
          <Paper className={classes.paper} elevation={3}>
            <Form>
              <Typography className={classes.interval}>
                Twitterユーザー名（先頭の@は抜きで入力してください）
              </Typography>
              <Field
                name="user"
                as={TextField}
                placeholder="Twitterユーザー名"
                type="text"
                variant="outlined"
                fullWidth
                error={errors.user && touched.user}
              />
              <ErrorMessage name="user">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Typography className={classes.interval}>
                取得するツイート数（最新のツイートから何個前のツイートまで分析対象とするか）
              </Typography>
              <Field
                name="ntweets"
                as={Select}
                type="select"
                variant="outlined"
                fullWidth
              >
                {NtweetOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field>
              <div className={classes.buttonWrapper}>
                <Button
                  type="submit"
                  className={classes.interval}
                  variant="contained"
                  color="primary"
                  endIcon={<SendRounded />}
                >
                  Send
                </Button>
              </div>
            </Form>
          </Paper>
        </Container>
      )}
    </Formik>
  );
};

export default UserAndNtweetsForm;
