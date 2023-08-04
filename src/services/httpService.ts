import apiClient from "./apiClient";
// interfaces:
interface IEntity {
  id: number;
}
class HTTPService {
  // public constructor(public endpoint: string) {}

  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // CRUD operations
  // get all
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  // delete
  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  // create
  create<T>(entitiy: T) {
    return apiClient.post(this.endpoint, entitiy);
  }

  // update
  update<T extends IEntity>(entitiy: T) {
    return apiClient.patch(this.endpoint + "/" + entitiy.id, entitiy);
  }
}

const createHTTPService = (endpoint: string) => new HTTPService(endpoint);

export default createHTTPService;
