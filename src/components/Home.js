import React from 'react';
import { isAuthenticated } from '../utils/auth';
import LogIn from './users/LogIn';
import Welcome from './Welcome';

export default function Home() {
  return <div>{isAuthenticated() ? <Welcome /> : <LogIn />}</div>;
}
