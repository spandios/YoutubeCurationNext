import jwt from 'jsonwebtoken'
const secretJwt = 'GCb1ou+v57zvlr4zWnEDTQ6pO4Yzsxg1+NOTwDttKkk='
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3bmR1ZHBvd2VyQGdtYWlsLmNvbSIsImlhdCI6MTYxNTgyNDIzNSwiaXNzIjoieWMiLCJlbWFpbCI6InduZHVkcG93ZXJAZ21haWwuY29tIiwiZXhwIjoxNjE1ODI3ODM1fQ.J-_gO-r9GAaEqpDsLBl60kpfuqBv1zJ6LaxWqKZbSBA'

jwt.verify(token, secretJwt, (err) => {
  console.log(err)
})
export const decoded = (token: string) => {
  return jwt.decode(token)
}

export const sign = (payload: any, expiredIn: string) => {
  return jwt.sign(payload, secretJwt, { expiresIn: expiredIn })
}

export const verify = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretJwt, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}
