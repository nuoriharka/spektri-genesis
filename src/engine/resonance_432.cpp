#include <node_api.h>
#include <chrono>
#include <cmath>
#include <string>

static std::chrono::steady_clock::time_point kStart = std::chrono::steady_clock::now();

static napi_value get_phase(napi_env env, napi_callback_info info) {
  auto now = std::chrono::steady_clock::now();
  std::chrono::duration<double> elapsed = now - kStart;
  double phase = std::fmod(elapsed.count() * 432.0, 1.0);
  if (phase < 0.0) phase += 1.0;
  napi_value result;
  napi_create_double(env, phase, &result);
  return result;
}

static napi_value calculate_coherence(napi_env env, napi_callback_info info) {
  size_t argc = 3;
  napi_value args[3];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  size_t str_len = 0;
  napi_get_value_string_utf8(env, args[0], nullptr, 0, &str_len);
  std::string hash(str_len, '\0');
  napi_get_value_string_utf8(env, args[0], hash.data(), str_len + 1, &str_len);

  double resonance = 0.0;
  double score = 0.0;
  napi_get_value_double(env, args[1], &resonance);
  napi_get_value_double(env, args[2], &score);

  bool hash_ok = hash.size() == 64;
  bool resonance_ok = resonance > 0.0;

  double coherence = 1.0;
  if (!hash_ok || !resonance_ok) {
    coherence = 0.6;
    if (!hash_ok) coherence = 0.2;
    if (!resonance_ok) coherence = std::min(coherence, 0.4);
    if (score <= 0.0) coherence = std::min(coherence, 0.7);
  }

  napi_value result;
  napi_create_double(env, coherence, &result);
  return result;
}

static napi_value init(napi_env env, napi_value exports) {
  napi_value phase_fn;
  napi_value coherence_fn;
  napi_create_function(env, "getPhase", NAPI_AUTO_LENGTH, get_phase, nullptr, &phase_fn);
  napi_create_function(env, "calculateCoherence", NAPI_AUTO_LENGTH, calculate_coherence, nullptr, &coherence_fn);
  napi_set_named_property(env, exports, "getPhase", phase_fn);
  napi_set_named_property(env, exports, "calculateCoherence", coherence_fn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
