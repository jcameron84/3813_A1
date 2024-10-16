// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';  // Zone.js is required by Angular itself
import 'zone.js/testing';  // Zone.js/testing is for test environments

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Manually import all spec files for tests
import './app/services/auth.service.spec';
import './app/guards/auth.guard.spec';
import './app/guards/role.guard.spec';
