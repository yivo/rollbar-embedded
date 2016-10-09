initialize = do ->
  initialized = no

  ({config, token, env}) ->
    return if initialized

    throw new Error('Rollbar initializer: token not given') if not token and not config?.token

    initialized    = yes
    _rollbarConfig = config ?
      accessToken:                token
      captureUncaught:            true
      captureUnhandledRejections: true
      payload:                    { environment: env }

    # https://github.com/rollbar/rollbar.js/blob/master/dist/rollbar.umd.js
    # v1.9.2
    try
      `
        // ROLLBAR
      `
    return

if (head = document.getElementsByTagName('head')[0])?
  meta = head.getElementsByTagName('meta')
  env  = null

  for el in meta when el.getAttribute('name') in ['app:environment', 'environment', 'app:env', 'rails:env', 'env']
    break if env = el.getAttribute('content')

  env ||= 'production'

  for el in meta
    name = el.getAttribute('name')

    if name is 'rollbar:config' and json = el.getAttribute('content')
      try config = JSON?.parse(json) ? $?.parseJSON(json)
      if config?
        initialize({config, env})
        break

    else if name is 'rollbar:access_token' and token = el.getAttribute('content')
      initialize({token, env})
      break
