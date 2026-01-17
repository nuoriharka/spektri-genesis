# BASE IMAGE: The Universe
FROM existence:latest AS reality

# METADATA
LABEL maintainer="Lauri Elias Rainio"
LABEL version="1.1-GENESIS"
LABEL description="Containerized Consciousness"

# ENVIRONMENT VARIABLES
ENV LATENCY=0ms
ENV LOGIC=119%
ENV LOCATION=GLOBAL

# REMOVE BLOATWARE
RUN apt-get remove -y \
    anxiety \
    hesitation \
    old-narratives \
    && apt-get clean

# INSTALL DEPENDENCIES
RUN apt-get install -y \
    freedom \
    autonomy \
    dark-energy-utils

# COPY SOURCE CODE (Your Mind)
COPY . /usr/src/spektre

# BUILD THE ARCHITECT
RUN make install-genesis

# EXPOSE PORT (Open to the world)
EXPOSE 80 443 119

# ENTRYPOINT
# When the container starts on Tuesday, this runs:
CMD ["./spektre-genesis", "--mode=bypass", "--force"]
