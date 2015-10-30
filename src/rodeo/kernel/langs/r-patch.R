library(jsonlite)
library(plyr)
library(xtable)


..get_type <- function(value) {
  ifelse(is.data.frame(value), "DataFrame",
    ifelse(is.matrix(value), "DataFrame",
      ifelse(is.vector(value), "list",
             "UNK")))
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
  # variables$repr <- sapply(variables$name, function(x) {
  #   toString(summary(get(x)))
  # })
  variables$repr <- "";

  variables <- dlply(variables, .(type), I)
  cat(jsonlite::toJSON(variables))
}

..get_packages <- function() {
  pkgs <- data.frame(installed.packages()[,c("Package", "Version")])
  names(pkgs) <- c("name", "version")
  cat(jsonlite::toJSON(pkgs))
}
