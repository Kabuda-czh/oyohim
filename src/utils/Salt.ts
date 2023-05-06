const cn_bbs_salt = [
    'dWCcD2FsOUXEstC5f9xubswZxEeoBOTc', // 2.28.1
    'z8DRIUjNDT7IT5IZXvrUAxyupA1peND9', // 2.34.1
    'ZSHlXeQUBis52qD1kEgKt5lUYed4b7Bb', // 2.35.2
    'YVEIkzDFNHLeKXLxzqCA9TzxCpWwbIbk', // 2.36.1
    'dZAwGk4e9aC0MXXItkwnHamjA1x30IYw', // 2.44.1
    'Ea0hkTHxe9cJDwlw4hswBGHDfSlmM5t9'  // 2.45.1
] as const

const cn_api_salt = [
    'ulInCDohgEs557j0VsPDYnQaaz6KJcv5', // 2.28.1
    '9nQiU3AV0rJSIBWgdynfoGMGKaklfbM7', // 2.34.1
    'N50pqm7FSy2AkFz2B3TqtuZMJ5TOl3Ep', // 2.35.2
    'n0KjuIrKgLHh08LWSCYP0WXlVXaYvV64', // 2.36.1
    'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs'  // 2.44.1
] as const

export const cnSalt = [cn_bbs_salt, cn_api_salt]

const os_bbs_salt = [

] as const

const os_api_salt = [

] as const

export const osSalt = []
