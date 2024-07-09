#include<iostream>
using namespace std;

int main()
{
    int mark ,count = 0;
    for(int i=1;i<=5;i++){
        cin >> mark;
    if(mark>30){
    cout<<"Invalid"<<endl;

    }
    else if(mark>20){
    count++;

    }
cout << count;
    }
    return 0;
}