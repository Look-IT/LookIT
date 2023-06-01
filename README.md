# LookIT
## 추억 기록 모바일 애플리케이션
## 팀원
| 이름 | 학번 | 담당 |
| ------ | ------ | ------ |
|   김효진     |    20학번  |    백엔드, 조장        |
|   임민호    |    19학번  |    백엔드       |
|   신호근     |    15학번  |    프론트엔드        |
|   장희지|    20학번  |    백엔드        |
|   최준호    |    18번  |    백엔드      |

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [사용한 Fixed point 체계](#사용한-Fixed-point-체계)
3. [Main 작동 방식](#Main-작동-방식)
4. [Function Description](#Function-Description)
5. [Function Performance](#Function-Performance)
6. [Function Accuracy](#Function-Accuracy)
7. [Constant Define](#Constant-Define)
8. [Makefile](#Makefile)
9. [결론](#결론)



## 프로젝트 소개

* 이 프로젝트는 아주대학교 실전코딩2 과목의 최종 프로젝트를 위해 작성되었음.

* 이 프로젝트의 성능 및 정확도 평가는 linux ubuntu 에서 수행되었음.

* C에서 실수끼리의 연산을 할 때, float 또는 double로 연산할 시, 소요되는 시간이 상당히 길다. 이는 다양한 환경에서 실수 연산을 수행하기에 장애를   준다. 따라서 이 프로젝트는 fixed 라는 type을 새롭게 정의하여, 실수 연산에 소요되는 시간을 줄이는 것을 목표로 하였다.

## 사용한 Fixed point 체계

* 이 프로젝트에서 사용한 고정 소수점 체계는 1bit의 signbit와, 17bit의 정수부, 14bit의 소수부를 가지고 있다.
* 이를 fx_S1714라고 지칭하였다.
* fx_S1714 fixed point 체계하에서 표현 가능한 수의 범위는 다음과 같다.

| 표현 가능한 가장 작은 수 | 표현 가능한 가장 큰 수 |
| ------ | ------ |
|   -131072     |     131071.9999   |

## Main 작동 방식

    1. 실행 시, user로부터 두 실수(float)를 input 으로 받는다. 
    2. fx_S1714 고정 소수점 체계로 input을 변환시킨다. 
    3. fx_S1714 고정 소수점 체계로 변환된 input을 2진수 형식으로 출력한다.
    4. 변환된 두개의 input에 대해 add, sub, mul, div 의 사칙연산을 수행하여 결과를 출력한다.

## Function Description
