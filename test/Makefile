# Some BSD compatibility declarations
.ALLSRC = $^
.ARCHIVE = $!
.IMPSRC = $<
.MEMBER = $%
.OODATE = $?
.PREFIX = $*
.TARGET = $@
.CURDIR = ${CURDIR}

.SUFFIXES: 
.SUFFIXES: .html .js

all : page-diag-workers.js

page-diag-workers.js : docwriter.js

.html.js : 
	cat docwriter.js > ${.TARGET}
	printf '("' >> ${.TARGET}
	cat ${.IMPSRC} | perl -npe 's/\\/\\\\/g; s/\r\n/\\n/g; s/\n/\\n/g; s/\t/\\t/g; s/"/\\"/g;' >> ${.TARGET}
	printf '");' >> ${.TARGET}

