package com.artbazar.artbazarbackend.utils;

import lombok.Data;

@Data
public class ApiResponse {
    public final String message;
    public final int status;
}
