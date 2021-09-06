---
weight: 201
title: "Docker Images"
date: 2021-08-29T12:14:02+12:00
draft: false
---

# Docker Images

## Requirements and Recommendations

### OnFinality Requirements

For a Docker container to run on OnFinality the image must:

- Have an entrypoint set with command to run the node daemon
- The demon must not be wrapped in a startup script
- Avoid using tini

### Recommendations

{{< hint info >}}
**Official Release**  
Users of your network will have more confidence when they know the available image is developed by the same developers as those who create the network.
{{< /hint >}}




Besides the above, we advise you to read the following from docker.com:

- https://docs.docker.com/develop/develop-images/dockerfile_best-practices/


### Example Dockerfile

From https://github.com/paritytech/polkadot/blob/master/docker/Dockerfile

```dockerfile
FROM paritytech/ci-linux:production as builder
LABEL description="This is the build stage for Polkadot. Here we create the binary."

ARG PROFILE=release
WORKDIR /polkadot

COPY . /polkadot

RUN cargo build --$PROFILE

# ===== SECOND STAGE ======

FROM debian:buster-slim
LABEL description="This is the 2nd stage: a very small image where we copy the Polkadot binary."
ARG PROFILE=release
COPY --from=builder /polkadot/target/$PROFILE/polkadot /usr/local/bin

RUN useradd -m -u 1000 -U -s /bin/sh -d /polkadot polkadot && \
	mkdir -p /polkadot/.local/share && \
	mkdir /data && \
	chown -R polkadot:polkadot /data && \
	ln -s /data /polkadot/.local/share/polkadot && \
	rm -rf /usr/bin /usr/sbin

USER polkadot
EXPOSE 30333 9933 9944
VOLUME ["/data"]

CMD ["/usr/local/bin/polkadot"]
```





