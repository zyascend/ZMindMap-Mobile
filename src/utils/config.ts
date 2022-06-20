import { Rule, ValidateMessages } from 'rc-field-form/lib/interface'

interface LoginConfigsTypes {
  validateMessages: ValidateMessages
  rules: {
    email: Rule[]
    pwd: Rule[]
  }
}

export const LoginConfigs: LoginConfigsTypes = {
  validateMessages: {
    pattern: {
      mismatch: '密码必须为6到15位的字母数字组合',
    },
  },
  rules: {
    email: [{ required: true, type: 'email' }],
    pwd: [
      {
        required: true,
        pattern: new RegExp('^[A-Za-z0-9]{6,15}$'),
      },
    ],
  },
}
