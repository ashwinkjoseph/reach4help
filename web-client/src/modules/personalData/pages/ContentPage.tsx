import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';
import { AppState } from 'src/store';

import { PersonalDataLocation } from './routes/PersonalDataRoute/constants';
import PersonalDataRoute from './routes/PersonalDataRoute/PersonalDataRoute';
import { RoleInfoLocation } from './routes/RoleInfoRoute/constants';
import RoleInfoRoute from './routes/RoleInfoRoute/RoleInfoRoute';

const ContentPage = (): ReactElement => {
  const loading = useSelector((state: AppState) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  if (loading) {
    return <>Loading</>;
  }

  // FIXME This should check if the user has already filled the
  // Personal data from
  // if(auth.user.geolocation)
  // eslint-disable-next-line no-constant-condition
  if (false) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return (
    <Switch>
      <Route
        path={PersonalDataLocation.path}
        component={PersonalDataRoute}
        exact
      />
      <Route path={RoleInfoLocation.path} component={RoleInfoRoute} exact />
      <Route path="*" component={NotFoundRoute} />
    </Switch>
  );
};
export default ContentPage;
