#define _WINSOCK_DEPRECATED_NO_WARNINGS

#include "stdafx.h"

int main()
{

    WSADATA wsaData;
    SOCKET cC;

    try
    {
        if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
        {
            throw  SetErrorMsgText("Startup: ", WSAGetLastError());
        }
        if ((cC = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
        {
            throw  SetErrorMsgText("socket: ", WSAGetLastError());
        }

        SOCKADDR_IN serv;
        int ls = sizeof(serv);
        serv.sin_family = AF_INET;
        serv.sin_port = htons(3000);
        serv.sin_addr.s_addr = inet_addr("127.0.0.1");

        clock_t start, end;
        char ibuf[50];
        int  libuf = 0, lobuf = 0;

        string obuf;

        cout << "Enter a message" << endl;
        cin >> obuf;

        if ((libuf = sendto(cC, obuf.c_str(), obuf.length() + 1, NULL, (SOCKADDR*)&serv, ls)) == SOCKET_ERROR)
            throw  SetErrorMsgText("sendto: ", WSAGetLastError());


        if ((libuf = recvfrom(cC, ibuf, sizeof(ibuf), NULL,
            (SOCKADDR*)&serv, &ls)) == SOCKET_ERROR)
        {
            throw  SetErrorMsgText("sendto: ", WSAGetLastError());
        }

        ibuf[libuf] = '\0';
        cout << ibuf << endl;

        if (closesocket(cC) == SOCKET_ERROR)
        {
            throw SetErrorMsgText("closesocket: ", WSAGetLastError());
        }
        if (WSACleanup() == SOCKET_ERROR)
        {
            throw  SetErrorMsgText("Cleanup: ", WSAGetLastError());
        }
    }
    catch (string errorMsgText)
    {
        cout << endl << errorMsgText;
    }

    system("pause");
    return 0;
}