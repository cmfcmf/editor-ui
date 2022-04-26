import axios from 'axios';

const host = process.env.REACT_APP_API_ENDPOINT;

const get = async (url, headers) => {
  return await axios.get(url, headers);
}

const post = async (url, body, headers) => {
  return await axios.post(url, body, headers);
}

const put = async (url, body, headers) => {
  return await axios.put(url, body, headers)
}

const headers = (accessToken) => {
    let headersHash
    if (accessToken) {
        headersHash = {'Accept': 'application/json', 'Authorization': accessToken}
    } else {
        headersHash = {'Accept': 'application/json'}
    }
    return {headers: headersHash}
}

export const updateProject = async (project, accessToken) => {
  return await put(
    `${host}/api/projects/${project.identifier}`,
    { project: project },
    headers(accessToken)
  );
}

export const newProject = async () => {
  return await post(`${host}/api/default_project/`, {}, headers());
}

export const remixProject = async (project, accessToken) => {
  return await post(`${host}/api/projects/${project.identifier}/remix`, { project: project}, headers(accessToken));
}

export const readProject = async (projectIdentifier) => {
  return await get(`${host}/api/projects/${projectIdentifier}`, headers());
}

export const readProjectList = async (accessToken) => {
  return await get(`${host}/api/projects`, headers(accessToken));
}

export const uploadImages = async (projectIdentifier, accessToken, images) => {
  var formData = new FormData();

  images.forEach(image => {
    formData.append('images[]', image, image.name);
  })

  return await post(`${host}/api/projects/${projectIdentifier}/images`, formData, {...headers(accessToken), 'Content-Type': 'multipart/form-data'})
}

export const getImage = async (url) => {
  return await get(url, headers())
}
