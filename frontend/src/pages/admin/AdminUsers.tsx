import { useEffect, useState } from 'react'
import {
  Shield,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import { api } from '../../lib/axios'

// ======================================================
// TYPES
// ======================================================

interface NestedObject {
  id?: string
  name?: string
  displayName?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

interface User {
  id: string

  name:
  | string
  | NestedObject
  | null

  email:
  | string
  | NestedObject
  | null

  role:
  | string
  | NestedObject
  | null

  department:
  | string
  | NestedObject
  | null
}

// ======================================================
// SAFE VALUE PARSER
// ======================================================

const parseValue = (
  value: any
) => {
  // NULL / UNDEFINED
  if (
    value === null ||
    value === undefined
  ) {
    return '-'
  }

  // STRING / NUMBER
  if (
    typeof value ===
    'string' ||
    typeof value ===
    'number'
  ) {
    return value
  }

  // OBJECT
  if (
    typeof value ===
    'object'
  ) {
    return (
      value.displayName ||
      value.name ||
      value.description ||
      JSON.stringify(value)
    )
  }

  return '-'
}

// ======================================================
// COMPONENT
// ======================================================

export default function AdminUsers() {
  // ======================================================
  // STATES
  // ======================================================

  const [users, setUsers] =
    useState<User[]>([])

  const [loading, setLoading] =
    useState(false)

  const [
    dropdownOpen,
    setDropdownOpen,
  ] = useState<
    string | null
  >(null)

  // ======================================================
  // FETCH USERS
  // ======================================================

  const fetchUsers =
    async () => {
      try {
        setLoading(true)

        const response =
          await api.get(
            '/users'
          )

        console.log(
          'USERS RESPONSE:',
          response.data
        )

        const data =
          response.data
            ?.data || []

        // SAFETY ARRAY
        setUsers(
          Array.isArray(
            data
          )
            ? data
            : []
        )
      } catch (error) {
        console.error(
          'FETCH USERS ERROR:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

  // ======================================================
  // INITIAL FETCH
  // ======================================================

  useEffect(() => {
    fetchUsers()
  }, [])

  // ======================================================
  // DELETE USER
  // ======================================================

  const deleteUser =
    async (
      id: string
    ) => {
      try {
        await api.delete(
          `/users/${id}`
        )

        // REFRESH
        await fetchUsers()

        // CLOSE MENU
        setDropdownOpen(
          null
        )
      } catch (error) {
        console.error(
          'DELETE USER ERROR:',
          error
        )
      }
    }

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div
        style={{
          color:
            'white',
          padding:
            '20px',
        }}
      >
        Loading users...
      </div>
    )
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================

  return (
    <div
      style={{
        padding: '20px',
        color: 'white',
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom:
            '24px',
        }}
      >
        <h1
          style={{
            fontSize:
              '1.6rem',
            fontWeight:
              700,
            marginBottom:
              '6px',
          }}
        >
          Users
          Management
        </h1>

        <p
          style={{
            color:
              'rgba(255,255,255,0.5)',
          }}
        >
          Kelola user
          organisasi.
        </p>
      </div>

      {/* EMPTY */}

      {users.length ===
        0 ? (
        <div
          style={{
            padding:
              '60px 20px',
            textAlign:
              'center',
            borderRadius:
              '16px',
            background:
              'rgba(255,255,255,0.03)',
            border:
              '1px solid rgba(255,255,255,0.06)',
          }}
        >
          Tidak ada
          user.
        </div>
      ) : (
        <div
          style={{
            background:
              '#111827',
            borderRadius:
              '16px',
            overflow:
              'hidden',
            border:
              '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* TABLE */}

          <table
            style={{
              width: '100%',
              borderCollapse:
                'collapse',
            }}
          >
            {/* HEAD */}

            <thead>
              <tr
                style={{
                  background:
                    '#1f2937',
                  textAlign:
                    'left',
                }}
              >
                <th
                  style={{
                    padding:
                      '16px',
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    padding:
                      '16px',
                  }}
                >
                  Email
                </th>

                <th
                  style={{
                    padding:
                      '16px',
                  }}
                >
                  Role
                </th>

                <th
                  style={{
                    padding:
                      '16px',
                  }}
                >
                  Department
                </th>

                <th
                  style={{
                    padding:
                      '16px',
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {users.map(
                (
                  user
                ) => (
                  <tr
                    key={
                      user.id
                    }
                    style={{
                      borderBottom:
                        '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* NAME */}

                    <td
                      style={{
                        padding:
                          '16px',
                        fontWeight:
                          600,
                      }}
                    >
                      {parseValue(
                        user.name
                      )}
                    </td>

                    {/* EMAIL */}

                    <td
                      style={{
                        padding:
                          '16px',
                        color:
                          'rgba(255,255,255,0.7)',
                      }}
                    >
                      {parseValue(
                        user.email
                      )}
                    </td>

                    {/* ROLE */}

                    <td
                      style={{
                        padding:
                          '16px',
                      }}
                    >
                      <span
                        style={{
                          display:
                            'inline-flex',
                          alignItems:
                            'center',
                          gap: '6px',
                          padding:
                            '6px 10px',
                          borderRadius:
                            '999px',
                          background:
                            'rgba(59,130,246,0.12)',
                          color:
                            '#60A5FA',
                          fontSize:
                            '0.82rem',
                        }}
                      >
                        <Shield
                          size={
                            13
                          }
                        />

                        {parseValue(
                          user.role
                        )}
                      </span>
                    </td>

                    {/* DEPARTMENT */}

                    <td
                      style={{
                        padding:
                          '16px',
                        color:
                          'rgba(255,255,255,0.7)',
                      }}
                    >
                      {parseValue(
                        user.department
                      )}
                    </td>

                    {/* ACTION */}

                    <td
                      style={{
                        padding:
                          '16px',
                        position:
                          'relative',
                      }}
                    >
                      <button
                        style={{
                          background:
                            'transparent',
                          border:
                            'none',
                          color:
                            'white',
                          cursor:
                            'pointer',
                        }}
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen ===
                              user.id
                              ? null
                              : user.id
                          )
                        }
                      >
                        <MoreHorizontal
                          size={
                            18
                          }
                        />
                      </button>

                      {/* DROPDOWN */}

                      <AnimatePresence>
                        {dropdownOpen ===
                          user.id && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: -10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: -10,
                              }}
                              style={{
                                position:
                                  'absolute',
                                right: 0,
                                top: '40px',
                                background:
                                  '#1f2937',
                                borderRadius:
                                  '12px',
                                padding:
                                  '10px',
                                zIndex: 10,
                                minWidth:
                                  '140px',
                                border:
                                  '1px solid rgba(255,255,255,0.08)',
                                boxShadow:
                                  '0 10px 30px rgba(0,0,0,0.4)',
                              }}
                            >
                              <button
                                style={{
                                  width:
                                    '100%',
                                  background:
                                    '#ef4444',
                                  border:
                                    'none',
                                  padding:
                                    '10px 14px',
                                  borderRadius:
                                    '8px',
                                  color:
                                    'white',
                                  cursor:
                                    'pointer',
                                  display:
                                    'flex',
                                  alignItems:
                                    'center',
                                  justifyContent:
                                    'center',
                                  gap: '6px',
                                }}
                                onClick={() =>
                                  deleteUser(
                                    user.id
                                  )
                                }
                              >
                                <Trash2
                                  size={
                                    14
                                  }
                                />

                                Delete
                              </button>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}