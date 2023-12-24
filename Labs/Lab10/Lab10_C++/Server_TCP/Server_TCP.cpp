#define _WINSOCK_DEPRECATED_NO_WARNINGS

#include <iostream>
#include <clocale>
#include <ctime>    


#include "stdafx.h"
#include "Winsock2.h"                
#pragma comment(lib, "WS2_32.lib")   

int main()
{
    setlocale(LC_ALL, "rus");

    SOCKET cC;
    WSADATA wsaData;
    try
    {
        if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)
            throw SetErrorMsgText("Startup:", WSAGetLastError());
        if ((cC = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET)
            throw SetErrorMsgText("socket:", WSAGetLastError());

        SOCKADDR_IN serv;
        serv.sin_family = AF_INET;
        serv.sin_port = htons(40000);
        serv.sin_addr.s_addr = INADDR_ANY;

        if (bind(cC, (LPSOCKADDR)&serv, sizeof(serv)) == SOCKET_ERROR)
            throw SetErrorMsgText("bind:", WSAGetLastError());

        if (listen(cC, SOMAXCONN) == SOCKET_ERROR)
            throw SetErrorMsgText("listen:", WSAGetLastError());

        SOCKET cS;
        SOCKADDR_IN clnt;
        memset(&clnt, 0, sizeof(clnt));
        int lclnt = sizeof(clnt);
        while (true)
        {
            if ((cS = accept(cC, (sockaddr*)&clnt, &lclnt)) == INVALID_SOCKET)
                throw SetErrorMsgText("accept:", WSAGetLastError());

            cout << "\n---- Client connected ----\n\n";

            cout << "IP adrress: " << inet_ntoa(clnt.sin_addr) << endl;
            cout << "port: " << ntohs(clnt.sin_port) << endl << endl;

            int lobuf = 0;
            int libuf = 0;
            char ibuf[50];


            if ((libuf = recv(cS, ibuf, sizeof(ibuf), NULL)) == SOCKET_ERROR)
            {
                if (WSAGetLastError() == WSAECONNRESET || WSAGetLastError() == WSAECONNABORTED)
                    break;

                throw SetErrorMsgText("recv: ", WSAGetLastError());
            }

            ibuf[libuf] = '\0';
            string obuf = "ECHO:" + string(ibuf);

            if ((lobuf = send(cS, obuf.c_str(), strlen(obuf.c_str()) + 1, NULL)) == SOCKET_ERROR)
                throw SetErrorMsgText("send: ", WSAGetLastError());

            cout << ibuf << endl;

            if (closesocket(cS) == SOCKET_ERROR)
                throw SetErrorMsgText("closesocket:", WSAGetLastError());
        }
        if (closesocket(cC) == SOCKET_ERROR)
            throw SetErrorMsgText("closesocket:", WSAGetLastError());
        if (WSACleanup() == SOCKET_ERROR)
            throw SetErrorMsgText("Cleanup:", WSAGetLastError());
    }
    catch (string errorMsgText)
    {
        cout << endl << errorMsgText;
    }
    cout << endl;
    system("pause");
    return 0;
}