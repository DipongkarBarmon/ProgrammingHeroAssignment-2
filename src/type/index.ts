export const userRole ={
   contributor : 'contributor',
   maintainer : 'maintainer',
   user : 'user'
} as const

export type Role = 'maintainer' | 'contributor'  