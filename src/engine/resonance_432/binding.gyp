{
  "targets": [
    {
      "target_name": "resonance_432",
      "sources": [ "../resonance_432.cpp" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "cflags!": [ "-fno-exceptions" ],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
      }
    }
  ]
}
