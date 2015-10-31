library(jsonlite)
library(plyr)
library(xtable)
library(stringr)


..get_type <- function(value) {
  ifelse(is.data.frame(value), "DataFrame",
    ifelse(is.matrix(value), "DataFrame",
      ifelse(is.list(value), "list",
        ifelse(is.vector(value), "vector",
             "UNK"))))
}

..get_variables <- function() {
  variables <- list(
    "list"= data.frame(name="", repr=""),
    "dict"= data.frame(name="", repr=""),
    "ndarray"= data.frame(name="", repr=""),
    "DataFrame"= data.frame(name="", repr=""),
    "Series"= data.frame(name="", repr="")
  )
  variables <- eapply(.GlobalEnv, ..get_type)
  variables <- data.frame(t(data.frame(variables)))
  variables$name <- rownames(variables)
  rownames(variables) <- NULL
  names(variables)[1] <- "type"
  variables$type <- as.character(variables$type)
  variables$repr <- sapply(variables$name, function(..x) {
    ..x <- get(..x)
    output <- capture.output(str(..x))
    if (is.data.frame(..x) || is.matrix(..x)) {
      output <- output[1]
      output <- stringr::str_replace_all(output, ":", "")
    }
    paste(output, collapse="\n")
  })

  variables <- dlply(variables, .(type), I)
  cat(jsonlite::toJSON(variables))
}

..get_packages <- function() {
  pkgs <- data.frame(installed.packages()[,c("Package", "Version")])
  names(pkgs) <- c("name", "version")
  cat(jsonlite::toJSON(pkgs))
}
