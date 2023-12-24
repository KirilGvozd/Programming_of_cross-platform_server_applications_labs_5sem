#pragma once
#define _WINSOCK_DEPRECATED_NO_WARNINGS

#include "Winsock2.h"
#pragma comment(lib, "WS2_32.lib") 
#include <iostream>
#include <string>
#include <tchar.h>
using namespace std;

string SetErrorMsgText(string msgText, int code);