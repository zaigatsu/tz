import { get, post, put, del } from "./index";

const uri = "/employee";

export default {
    fields() {
        return {
            name: "",
            birthdate: null,
            position: ""
        }
    },
    find() {
        return get(uri)
            .then(({ data, status }) => {
                return status === 200 ? data : [];
            })
            .catch(() => {
                return [];
            });
    },
    findOne(id) {
        return get(`${uri}/${id}`)
            .then(({ data, status }) => {
                return status === 200 ? data : null;
            })
            .catch(() => {
                return null;
            });
    },
    update(employee) {
        return put(`${uri}`, employee)
            .then(({ status }) => {
                return status === 200 ? true : false;
            })
            .catch(() => {
                return false;
            });
    },
    insert(employee) {
        return post(`${uri}`, employee)
            .then(({ status }) => {
                return status === 201 ? true : false;
            })
            .catch(() => {
                return false;
            });
    },
    delete(id) {
        return del(`${uri}/${id}`)
            .then(({ status }) => {
                return status === 200 ? true : false;
            })
            .catch(() => {
                return false;
            });
    }
};
