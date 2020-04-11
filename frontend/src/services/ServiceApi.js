import Api from "@/services/Api";
import MockAdapter from "axios-mock-adapter";
import Mock from "@/services/ServiceApi.mock";
const options = { baseURL: process.env.VUE_APP_API_URL };
const NormalApi = Api(options);

const makeRequest = ({
  url = null,
  mockResponse = null,
  apiMethod = null,
  apiPayload = null
}) => {
  const MockApi = Api(options);
  const mock = new MockAdapter(MockApi, { delayResponse: 1300 });
  const useMock = process.env.VUE_APP_MOCK === "true";
  const selectedApi = useMock && mockResponse ? MockApi : NormalApi;
  const mockMethods = {
    get: "onGet",
    post: "onPost",
    put: "onPut",
    delete: "onDelete"
  };
  if (mockResponse) {
    const mockMethod = mockMethods[apiMethod];
    mock[mockMethod](url).reply(() => mockResponse);
  }
  return selectedApi[apiMethod](url, apiPayload);
};

export default {
  index() {
    return makeRequest({
      url: `/farms`,
      apiMethod: "get",
      apiPayload: {},
      mockResponse: Mock.index
    });
  },

  show({ id = null }) {
    return makeRequest({
      url: `/farms/${id}`,
      apiMethod: "get",
      apiPayload: {},
      mockResponse: Mock.show
    });
  },

  store({
    name = null,
    owner = null,
    address = null,
    lat = null,
    long = null
  }) {
    return makeRequest({
      url: `/farms`,
      apiMethod: "post",
      apiPayload: {
        name,
        owner,
        address,
        lat,
        long
      },
      mockResponse: Mock.store
    });
  },

  update({
    id = null,
    name = null,
    owner = null,
    address = null,
    lat = null,
    long = null
  }) {
    return makeRequest({
      url: `/farms/${id}`,
      apiMethod: "put",
      apiPayload: {
        name,
        owner,
        address,
        lat,
        long
      },
      mockResponse: Mock.update
    });
  },

  destroy({ id = null }) {
    return makeRequest({
      url: `/farms/${id}`,
      apiMethod: "delete",
      apiPayload: {},
      mockResponse: Mock.destroy
    });
  },

  upload({ id = null, formData }) {
    return makeRequest({
      url: `/farms/${id}/image`,
      apiMethod: "post",
      apiPayload: formData,
      mockResponse: Mock.upload
    });
  },

  showImage({ id = null }) {
    return NormalApi.get(`/farms/${id}/image`, {
      responseType: "blob",
      timeout: 30000
    });
  }
};
