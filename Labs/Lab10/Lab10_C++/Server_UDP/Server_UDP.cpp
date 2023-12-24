#include "stdafx.h"

int main()
{
    setlocale(LC_ALL, "rus");

    WSADATA wsaData;

    SOCKET  sS;
    SOCKADDR_IN serv;

    serv.sin_family = AF_INET;
    serv.sin_port = htons(3000);
    serv.sin_addr.s_addr = inet_addr("0.0.0.0");

    try
    {

        if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
        {
            throw  SetErrorMsgText("WSAStartup: ", WSAGetLastError());
        }


        if ((sS = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
        {
            throw  SetErrorMsgText("socket: ", WSAGetLastError());
        }
        if (bind(sS, (LPSOCKADDR)&serv, sizeof(serv)) == SOCKET_ERROR)
        {
            throw  SetErrorMsgText("bind: ", WSAGetLastError());
        }

        SOCKADDR_IN clientInfo;
        memset(&clientInfo, 0, sizeof(clientInfo));
        char ibuf[50];
        int lc = sizeof(clientInfo), lb = 0, lobuf = 0;
        clock_t start, end;
        bool flag = true;

        while (true)
        {
            if ((lb = recvfrom(sS, ibuf, sizeof(ibuf), NULL, (sockaddr*)&clientInfo, &lc)) == SOCKET_ERROR)
            {
                throw SetErrorMsgText("recvfrom: ", WSAGetLastError());
            }

            ibuf[lb] = '\0';
            cout << ibuf << endl;

            string obuf = "ECHO:" + string(ibuf);

            if ((lobuf = sendto(sS, obuf.c_str(), obuf.size(), NULL, (sockaddr*)&clientInfo, lc)) == SOCKET_ERROR)
            {
                throw SetErrorMsgText("sendto: ", WSAGetLastError());
            }
        }
    }
    catch (basic_string<char> error_msg_text)
    {
        cout << endl << error_msg_text;
    }

    system("pause");
    return 0;
}