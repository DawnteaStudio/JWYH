# JWYH
<img width="587" alt="스크린샷 2023-06-18 오후 9 46 59" src="https://github.com/DawnteaStudio/JWYH/assets/90132183/db8b4848-388d-4c1a-9b1a-c7202509b432">

 미래에 보내는 편지 웹서비스
***
## **목차**

1. [프로젝트 소개](#프로젝트-소개)  
    1.1  [프로젝트 주제](#프로젝트-주제)  
    1.2  [페르소나](#페르소나)  
    1.3  [기획 의도](#기획-의도)
2. [기술 스택](#기술-스택)
3. [프로젝트 구조](#프로젝트-구조)
4. [시연 영상](#시연-영상)
5. [팀원 소개](#팀원-소개)
***
# 1. 프로젝트 소개 <a name="프로젝트-소개"></a>

## 1.1 프로젝트 주제 <a name="프로젝트-주제"></a>

💡 특정한 날짜에만 열 수 있는 편지를 주고 받는 서비스 입니다.

💡 특별한 날, 특별한 사람에게 말로 전하기 어려운 마음을 대신 전달해 줍니다.

💡 보내는 사람이 원하는 날짜에만 편지를 열 수 있기 때문에 받는 사람에게 기대감과 감동 선사할 수 있는 느린 우체통입니다.

## 1.2 페르소나  <a name="페르소나"></a>

💡 편지의 가치와 의미를 다시 한 번 느끼고 싶은 사람들

## 1.3 기획 의도 <a name="기획-의도"></a>

💡 현대 사회에서 사람들은 즉각적인 피드백을 받을 수 있는 연락 방식과 짧고 간결한 메시지를 선호하게 되었습니다. 

💡 저희는 오래전 잊혀진 편지의 가치와 의미를 다시 한 번 되돌려주자 하는 생각에서 출발해 서비스를 기획하게 되었습니다.
***
# 2. 기술 스택 <a name="기술-스택"></a>

### 💻 Front-End
<br>
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

> 정적 타입을 추가 하여, 코드의 가독성 향상, 런타임 전에 오류 제거를 위해 사용했습니다.
> 
<br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">

> 컴포넌트를 기반으로 UI를 구성하여 재사용 향상시키기 위해 사용했습니다.
> 
<br>
<img src="https://img.shields.io/badge/recoil-E8E8E8?style=for-the-badge&logo=recoil&logoColor=white">

> 전역 상태 라이브러리로서 사용했습니다.
> 

<br>
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

> HTTP 요청, 응답 처리로서 사용했습니다.
> 
<br>
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

> 모듈 번들러, 개발 서버 구동과, 프로젝트 빌드를 위해 사용했습니다.
> 
---

### 💻 Back-End

<br>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">

> Node.js는 이벤트 기반 및 비동기 처리 모델을 사용하여, 매우 빠르고 효율적으로 동작합니다. 이 서비스는 작은 규모의 서비스이므로 적은 리소스를 사용해 효율적으로 운영하기 위해 선택했습니다.
> 

<br>
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">

> Nginx는 정적 파일을 매우 효율적으로 처리할 수 있는 웹 서버이며, SSL/TLS 인증서를 쉽게 구성하고 관리할 수 있는 기능을 사용하여 http, https 둘다 배포를 시도하기 위해 사용했습니다.
> 

<br>
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

> JSON 형태의 문서 기반 구조로 데이터를 저장하고 조회하기 때문에, 직관적으로 이해하여 개발 생산성을 높이기 위해 선택했습니다. 동적 스키마를 사용하여 요구 사항이 변경될 때 데이터베이스 스키마를 유연하게 조정하기 위함 역시 선택에 중요한 부분이엇습니다.

<br>
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

> 작관적인 API로 개발의 시작이 쉽고 node.js로 개발을 했기 때문에 선택했습니다. 또한 다양한 미들웨어 중 저희가 원하는 것만 선택할 수 있다는 점도 매력적인 점이었습니다.
>

<br>
<img src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white">

> 서버 앱이 꺼졋을때 자동으로 프로세스를 다시 켜주며, 소스코드가 변경되었을 때, 자동으로 프로그램을 껏다 켜줘 프로젝트의 관리와 생산성을 높이기 위해 사용했습니다. 메모리 및 CPU 사용량을 추적하는 기능을 포함하여 실행중인 애플리케이션의 상태를 실시간으로 모니터링도 함께 할 수 있었습니다.
>

<br>
<img src="https://img.shields.io/badge/let'sencrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white">

> Let's Encrypt는 무료 SSL/TLS 인증서를 발급해주기 때문에 추가 비용 없이 웹 사이트의 보안을 강화할 수 있어 사용했습니다. 뿐만 아니라 설정을 해주면 자동갱신 기능까지 제공하는 점이 매력적이었습니다.
> 

---

### 💻 Tool

<br>
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

> 서비스를 기획할 때 구조를 잡기 위해 사용했습니다. 다양한 툴로 쉽게 디자인을 할 수 있고, CSS를 계획하는 것에 큰 도움이 되었습니다. 팀원들과 함께 공유하고 수정하는 등 협업에 도움이 되어 기획 시간을 단축할 수 있었습니다.
>

***

# 3. 프로젝트 구조 <a name="프로젝트-구조"></a>
### 🔍 ERD
<img width="465" alt="erd" src="https://github.com/DawnteaStudio/JWYH/assets/90132183/f395a9f5-4b62-4c2b-b250-7d6c21ef631e">

### 📈 FLOW CHART
<img width="465" alt="flowchart" src="https://github.com/DawnteaStudio/JWYH/assets/90132183/13a29498-d5cb-43a8-b35c-864d6c178582">

***

# 4. 시연 영상 <a name="시연-영상"></a>

https://github.com/DawnteaStudio/JWYH/assets/90132183/d62d8200-80fd-4592-b9e0-deb893891e7f



# 5. 팀원 소개 <a name="팀원-소개"></a>
***
| 이름 | 역할 | 담당 역할 |
| --- | --- | --- |
| 김대현 | 팀장, FE | 메인페이지 담당 |
| 이윤지 | FE | 인트로페이지, 회원관련 페이지 담당 |
| 최윤서 | FE | 편지쓰기 페이지 담당 |
| 이서진 | FE | 편지보관 페이지 담당 |
| 박세원 | BE | 편지관련 CURD 기능 <br> nginx와 pm2를 통한 배포|
| 최현수 | BE | 소셜로그인, 로그인 기능 <br> 회원가입 및 유효성 검사 기능|
| 한승협 | BE | api 제작 협력 |
