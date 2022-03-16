import Network from "../Network/Network";
import { Url } from "../Network/Url";

export const getVerifiedApi = (otp,username) => {
  return Network.makeApiCall({
    method: 'POST',
    url: `${Url.verify}${username}`,
    data: {
      otp,
    },
  });
};

export const getResendApi = (username) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.resend}${username}`,
  });
};

export const getContentApi = (chapterId,page,token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.content}${chapterId}${Url.pageNum}${page}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getChaptersApi = (id, token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.chapters}${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHomeNameApi = token => {
  return Network.makeApiCall({
    method: 'GET',
    url: Url.name,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHomeDataApi = (token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: Url.homeStudying,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubjectApi = token => {
  return Network.makeApiCall({
    method: 'GET',
    url: Url.subjects,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSearchApi = (enteredText, token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.search}${enteredText}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNotificationApi = (token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: Url.notifcation,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getResultsApi = token => {
  return Network.makeApiCall({
    method: 'GET',
    url: Url.result,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfileApi = token => {
  return Network.makeApiCall({
    method: 'GET',
    url: Url.profile,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEditProfileApi = (name, token) => {
  return Network.makeApiCall({
    method: 'PUT',
    url: Url.editProfile,
    data: {
        name
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNotificationTrueApi = token => {
  return Network.makeApiCall({
    method: 'DELETE',
    url: `${Url.setNotif}1`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNotificationFalseApi = token => {
  return Network.makeApiCall({
    method: 'DELETE',
    url: `${Url.setNotif}0`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getQuestionsApi = (courseId, token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.getTest}${courseId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getResetPassApi = (username, password, otp) => {
  return Network.makeApiCall({
    method: 'POST',
    url: Url.reset,
    data: {
        username,
        password,
        otp
    }
  });
};

export const getSignInDataApi = (username, password) => {
  return Network.makeApiCall({
    method: 'POST',
    url: Url.authenticate,
    data: {
      username,
      password,
    },
  });
};

export const getForgotApi = (username) => {
  return Network.makeApiCall({
    method: 'PUT',
    url: Url.forgot,
    data: {
        username
    }
  });
};

export const getSignUpApi = (name, username, password) => {
  return Network.makeApiCall({
    method: 'POST',
    url: Url.create,
    Data: {
        name,
        username,
        password
    }
  });
};

export const getCourseApi = (subjectId, token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.courses}${subjectId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLessonsApi = (courseId, token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.lessons}${courseId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLessonStudyingApi = (token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: Url.lessonStudying,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBeginTestApi = (courseId, token, question, markedAnswer) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.beginTest}${courseId}${question}markedAnswer=${markedAnswer}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubmitTestApi = (courseId, token) => {
  return Network.makeApiCall({
    method: 'GET',
    url: `${Url.submitTest}${courseId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



